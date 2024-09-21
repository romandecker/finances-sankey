import { z } from "zod";
import { Category, makeCategory } from "./Category";
import { Transaction } from "../storage";
import defaultCategories from "./defaultCategories.json";

const baseRawCategorySchema = z.object({
    names: z.array(z.string()).nonempty(),
});

type RawCategory = z.infer<typeof baseRawCategorySchema> & {
    children?: RawCategory[];
};

const rawCategorySchema: z.ZodType<RawCategory> = baseRawCategorySchema.extend({
    children: z.lazy(() => z.array(rawCategorySchema)).optional(),
});

function makeRootSchema(type: Transaction["type"]) {
    const transform = (raw: RawCategory): Category => {
        return makeCategory({
            names: raw.names,
            children: (raw.children ?? []).map(transform),
            type,
        });
    };

    return z.array(rawCategorySchema).transform((expenseCategories) =>
        makeCategory({
            names: [type],
            children: expenseCategories.map(transform),
            type,
        })
    );
}

export const ontologySchema = z.object({
    expenses: makeRootSchema("Expenses"),
    income: makeRootSchema("Income"),
});

export type CategoryOntology = z.infer<typeof ontologySchema>;
export const defaultOntology = ontologySchema.parse(defaultCategories);
