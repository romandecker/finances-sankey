import { Transaction } from "../storage.js";
import { Category } from "./Category.ts";

describe("Category", () => {
    describe("#calculate_total", () => {
        it("should incorporate direct costs into a category's total", () => {
            const a = new Category({ names: ["a"] });
            a.addTransaction({ amount: 10 } as Transaction);
            expect(a.calculateTotal()).toEqual(10);
        });

        it("should incorporate all descendants", () => {
            const ad = new Category({ names: ["a.d"] });
            const abc = new Category({ names: ["a.b.c"] });
            const ab = new Category({
                names: ["a.b"],
                children: [abc],
            });

            const a = new Category({
                names: ["a"],
                children: [ad, ab],
            });

            a.addTransaction({ amount: 2 } as Transaction);
            ab.addTransaction({ amount: 3 } as Transaction);
            abc.addTransaction({ amount: 5 } as Transaction);
            ad.addTransaction({ amount: 7 } as Transaction);
        });
    });
});
