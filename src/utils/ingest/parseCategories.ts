import { z } from "zod";
import { Category, makeCategory } from "./Category";

const baseRawCategorySchema = z.object({
    name: z.array(z.string()).nonempty(),
});

type RawCategory = z.infer<typeof baseRawCategorySchema> & {
    children: RawCategory[];
};

const rawCategorySchema: z.ZodType<RawCategory> = baseRawCategorySchema.extend({
    children: z.lazy(() => rawCategorySchema.array()),
});

const categorySchema = rawCategorySchema.transform(({ names, children }) =>
    makeCategory({ names })
);

// export const categorySchema: z.ZodType<Category> = z
//     .object({
//         names: z.array(z.string()).min(1),
//         children: z.lazy(() => z.array(categorySchema)),
//     })
//     .transform(({ names }) =>
//         makeCategory({ names: names as [string, ...string[]] })
//     );
