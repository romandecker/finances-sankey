import { makeCategory } from "./Category";

export const createIncomeTree = () =>
    makeCategory({
        names: ["Income"],
        children: [
            makeCategory({ names: ["Checks, coupons"], type: "Income" }),
            makeCategory({ names: ["Child Support"], type: "Income" }),
            makeCategory({ names: ["Dues & grants"], type: "Income" }),
            makeCategory({
                names: ["Gifts", "Gifts, joy"],
                type: "Income",
            }),
            makeCategory({
                names: ["Interests, dividends"],
                type: "Income",
            }),
            makeCategory({
                names: ["Lending, renting"],
                children: [
                    makeCategory({
                        names: [
                            "Money returned to me",
                            "Returned lent out money",
                        ],
                        type: "Income",
                    }),
                    makeCategory({
                        names: ["Splitwise credit"],
                        type: "Income",
                    }),
                    makeCategory({
                        names: [
                            "Temporarily held money intended for another purpose",
                        ],
                        type: "Income",
                    }),
                ],
            }),
            makeCategory({ names: ["Lottery, gambling"], type: "Income" }),
            makeCategory({
                names: ["Refunds (tax, purchase)"],
                type: "Income",
            }),
            makeCategory({ names: ["Rental income"], type: "Income" }),
            makeCategory({
                names: ["Sale"],
                children: [
                    makeCategory({
                        names: ["Sale of securities"],
                        type: "Income",
                    }),
                ],
            }),
            makeCategory({ names: ["Wage, invoices"], type: "Income" }),
            makeCategory({
                names: ["Missing", "UNKNOWN_CATEGORY"],
                type: "Income",
            }),
        ],
        type: "Income",
    });
