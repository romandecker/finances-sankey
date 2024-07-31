import Papa from "papaparse";
import { z } from "zod";

const zBooleanAsString = z.string().transform((str) => str === "true");

const csvSchema = z.array(
    z.object({
        account: z.string(),
        amount: z.coerce.number(),
        category: z.string(),
        currency: z.string(),
        custom_category: zBooleanAsString,
        date: z.coerce.date(),
        envelope_id: z.coerce.number(),
        gps_accuracy_in_meters: z.string(),
        gps_latitude: z.string(),
        gps_longitude: z.string(),
        labels: z.string().transform((str) => str.split(",")),
        note: z.string(),
        payee: z.string(),
        payment_type: z.string(),
        payment_type_local: z.string(),
        ref_currency_amount: z.coerce.number(),
        transfer: zBooleanAsString,
        type: z.enum(["Expenses", "Income"]),
        warranty_in_month: z.string(),
    })
);

export async function loadCsv() {
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const parseResult = Papa.parse(await file.text(), {
        header: true,
    });
    if (parseResult.errors.length) {
        console.warn("Errors when parsing CSV:", parseResult.errors);
    }

    return csvSchema.parse(parseResult.data);
}
