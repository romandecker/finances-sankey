import Papa from "papaparse";
import { z } from "zod";

const zBooleanAsString = z.string().transform((str) => str === "true");

const baseTransactionSchema = z.object({
    account: z.string(),
    category: z.string(),
    currency: z.string(),
    gps_accuracy_in_meters: z.string(),
    gps_latitude: z.string(),
    gps_longitude: z.string(),
    note: z.string(),
    payee: z.string(),
    payment_type: z.string(),
    payment_type_local: z.string(),
    warranty_in_month: z.string(),
    type: z.enum(["Expenses", "Income"]),
});

const csvRowSchema = baseTransactionSchema.extend({
    amount: z.coerce.number(),
    custom_category: zBooleanAsString,
    date: z.coerce.date(),
    envelope_id: z.coerce.number(),
    labels: z.string().transform((str) => str.split(",")),
    ref_currency_amount: z.coerce.number(),
    transfer: zBooleanAsString,
});

const localStorageTransactionSchema = baseTransactionSchema.extend({
    amount: z.number(),
    custom_category: z.boolean(),
    date: z.coerce.date(),
    envelope_id: z.number(),
    labels: z.array(z.string()),
    ref_currency_amount: z.number(),
    transfer: z.boolean(),
});

const localStorageSchema = z
    .string()
    .transform((str, ctx) => {
        try {
            return JSON.parse(str);
        } catch (e) {
            ctx.addIssue({ code: "custom", message: "Invalid JSON" });
            return z.NEVER;
        }
    })
    .pipe(z.array(localStorageTransactionSchema));

export type Transaction = z.infer<typeof localStorageTransactionSchema>;

export async function importCsv() {
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const parseResult = Papa.parse(await file.text(), {
        header: true,
    });
    if (parseResult.errors.length) {
        console.warn("Errors when parsing CSV:", parseResult.errors);
    }

    const parsed: Transaction[] = [];
    for (const row of parseResult.data) {
        const parseResult = csvRowSchema.safeParse(row);
        if (parseResult.success) {
            parsed.push(parseResult.data);
        } else {
            console.warn("Error parsing CSV row:", parseResult);
        }
    }

    console.log("Parsed", parsed.length, "rows");

    return parsed;
}

const LOCAL_STORAGE_KEY = "recent";

export function loadLocalStorage(): Transaction[] | null {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
        return null;
    }

    const parsed = localStorageSchema.parse(raw);
    console.log("Loaded", parsed.length, "transactions from local storage");
    return parsed;
}

export async function saveLocalStorage(
    transactions: ReadonlyArray<Transaction>
) {
    window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(transactions)
    );
}
