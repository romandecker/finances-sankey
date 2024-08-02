import { Category, CategoryRegistry } from "./category";

export const createIncomeRegistry = () =>
    new CategoryRegistry(
        new Category({
            names: ["Income"],
            children: [
                new Category({ names: ["Checks, coupons"] }),
                new Category({ names: ["Child Support"] }),
                new Category({ names: ["Dues & grants"] }),
                new Category({ names: ["Gifts"] }),
                new Category({ names: ["Interests, dividends"] }),
                new Category({
                    names: ["Lending, renting"],
                    children: [
                        new Category({ names: ["Money returned to me"] }),
                        new Category({ names: ["Splitwise credit"] }),
                    ],
                }),
                new Category({ names: ["Lottery, gambling"] }),
                new Category({ names: ["Refunds (tax, purchase)"] }),
                new Category({ names: ["Rental income"] }),
                new Category({
                    names: ["Sale"],
                    children: [new Category({ names: ["Sale of securities"] })],
                }),
                new Category({ names: ["Wage, invoices"] }),
            ],
        })
    );
