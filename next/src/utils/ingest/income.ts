import { Category } from "./Category";

export const createIncomeTree = () =>
    new Category({
        names: ["Income"],
        children: [
            new Category({ names: ["Checks, coupons"], type: "Income" }),
            new Category({ names: ["Child Support"], type: "Income" }),
            new Category({ names: ["Dues & grants"], type: "Income" }),
            new Category({
                names: ["Gifts", "Gifts, joy"],
                type: "Income",
            }),
            new Category({
                names: ["Interests, dividends"],
                type: "Income",
            }),
            new Category({
                names: ["Lending, renting"],
                children: [
                    new Category({
                        names: [
                            "Money returned to me",
                            "Returned lent out money",
                        ],
                        type: "Income",
                    }),
                    new Category({
                        names: ["Splitwise credit"],
                        type: "Income",
                    }),
                    new Category({
                        names: [
                            "Temporarily held money intended for another purpose",
                        ],
                        type: "Income",
                    }),
                ],
            }),
            new Category({ names: ["Lottery, gambling"], type: "Income" }),
            new Category({
                names: ["Refunds (tax, purchase)"],
                type: "Income",
            }),
            new Category({ names: ["Rental income"], type: "Income" }),
            new Category({
                names: ["Sale"],
                children: [
                    new Category({
                        names: ["Sale of securities"],
                        type: "Income",
                    }),
                ],
            }),
            new Category({ names: ["Wage, invoices"], type: "Income" }),
            new Category({
                names: ["Missing", "UNKNOWN_CATEGORY"],
                type: "Income",
            }),
        ],
        type: "Income",
    });
