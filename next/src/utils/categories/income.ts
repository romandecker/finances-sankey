import { Category, CategoryRegistry } from "./category";

export const createIncomeRegistry = () =>
    new CategoryRegistry(
        new Category({
            names: ["Income"],
            children: [
                new Category({ names: ["Checks, coupons"] }),
                new Category({ names: ["Child Support"] }),
                new Category({ names: ["Dues & grants"] }),
                new Category({ names: ["Gifts", "Gifts, joy"] }),
                new Category({ names: ["Interests, dividends"] }),
                new Category({
                    names: ["Lending, renting"],
                    children: [
                        new Category({
                            names: [
                                "Money returned to me",
                                "Returned lent out money",
                            ],
                        }),
                        new Category({ names: ["Splitwise credit"] }),
                        new Category({
                            names: [
                                "Temporarily held money intended for another purpose",
                            ],
                        }),
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
                new Category({ names: ["Missing", "UNKNOWN_CATEGORY"] }),
            ],
        })
    );
