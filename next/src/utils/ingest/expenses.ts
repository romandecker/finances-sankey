import { Category } from "./Category";
import { TransactionRegistry } from "./TransactionRegistry";

export const createExpensesTree = () =>
    new Category({
        names: ["Expenses"],
        children: [
            new Category({
                names: ["Food & Beverages", "Food & Drinks"],
                children: [
                    new Category({
                        names: ["Bar, Cafe", "Bar, cafe"],
                    }),
                    new Category({
                        names: ["Groceries"],
                        children: [new Category({ names: ["Meal Kits"] })],
                    }),
                    new Category({
                        names: ["Restaurant, fast-food"],
                        children: [
                            new Category({ names: ["Deli"] }),
                            new Category({ names: ["Food delivery"] }),
                        ],
                    }),
                ],
            }),
            new Category({
                names: ["Shopping"],
                children: [
                    new Category({
                        names: ["Clothes & Footwear", "Clothes & shoes"],
                    }),
                    new Category({ names: ["Drug-store, chemist"] }),
                    new Category({ names: ["Electronics, accessories"] }),
                    new Category({
                        names: ["Gifts, joy", "Gifts"],
                    }),
                    new Category({ names: ["Health and beauty"] }),
                    new Category({ names: ["Home, garden"] }),
                    new Category({ names: ["Jewels, accessories"] }),
                    new Category({ names: ["Kids"] }),
                    new Category({ names: ["Leisure time"] }),
                    new Category({ names: ["Pets, animals"] }),
                    new Category({ names: ["Stationery, tools"] }),
                ],
            }),
            new Category({
                names: ["Housing"],
                children: [
                    new Category({
                        names: ["Energy, utilities"],
                        children: [
                            new Category({ names: ["Electricity"] }),
                            new Category({ names: ["Heating"] }),
                        ],
                    }),
                    new Category({ names: ["Maintenance, repairs"] }),
                    new Category({ names: ["Mortgage"] }),
                    new Category({ names: ["Property insurance"] }),
                    new Category({ names: ["Rent"] }),
                    new Category({ names: ["Services"] }),
                ],
            }),
            new Category({
                names: ["Transportation"],
                children: [
                    new Category({ names: ["Business trips"] }),
                    new Category({ names: ["Long distance"] }),
                    new Category({
                        names: ["Public transport"],
                        children: [new Category({ names: ["Train"] })],
                    }),
                    new Category({ names: ["Taxi"] }),
                ],
            }),
            new Category({
                names: ["Vehicle"],
                children: [
                    new Category({ names: ["Fuel"] }),
                    new Category({ names: ["Leasing"] }),
                    new Category({ names: ["Parking"] }),
                    new Category({ names: ["Rentals"] }),
                    new Category({ names: ["Vehicle insurance"] }),
                    new Category({ names: ["Vehicle maintenance"] }),
                ],
            }),
            new Category({
                names: ["Life & Entertainment"],
                children: [
                    new Category({ names: ["Active sport, fitness"] }),
                    new Category({ names: ["Alcohol, tobacco"] }),
                    new Category({
                        names: ["Books, audio, subscriptions"],
                    }),
                    new Category({
                        names: ["Charity, gifts"],
                        children: [new Category({ names: ["Donations"] })],
                    }),
                    new Category({ names: ["Culture, sport events"] }),
                    new Category({ names: ["Education, development"] }),
                    new Category({
                        names: ["Health care, doctor"],
                        children: [
                            new Category({
                                names: ["Medical treatment, therapy"],
                            }),
                            new Category({ names: ["Medicine"] }),
                        ],
                    }),
                    new Category({
                        names: ["Hobbies", "Free time"],
                    }),
                    new Category({ names: ["Holiday, trips, hotels"] }),
                    new Category({ names: ["Life events"] }),
                    new Category({ names: ["Lottery, gambling"] }),
                    new Category({ names: ["TV, Streaming"] }),
                    new Category({ names: ["Wellness, beauty"] }),
                ],
            }),
            new Category({
                names: ["Communication, PC"],
                children: [
                    new Category({ names: ["Internet"] }),
                    new Category({ names: ["Postal services"] }),
                    new Category({
                        names: ["Software, apps, games"],
                        children: [new Category({ names: ["Gaming"] })],
                    }),
                    new Category({
                        names: ["Telephony, mobile phone", "Phone, cell phone"],
                    }),
                ],
            }),

            new Category({
                names: ["Financial expenses"],
                children: [
                    new Category({ names: ["Advisory"] }),
                    new Category({ names: ["Charges, Fees"] }),
                    new Category({ names: ["Child Support"] }),
                    new Category({ names: ["Fines"] }),
                    new Category({ names: ["Insurances"] }),
                    new Category({
                        names: ["Loans, interests", "Loan, interests"],
                    }),
                    new Category({
                        names: ["Taxes"],
                        children: [
                            new Category({
                                names: ["DDI (Ausschüttungsgleicher Ertrag)"],
                            }),
                        ],
                    }),
                ],
            }),

            new Category({
                names: ["Investments"],
                children: [
                    new Category({ names: ["Collections"] }),
                    new Category({
                        names: ["Financial investments"],
                        children: [new Category({ names: ["Crypto"] })],
                    }),
                    new Category({ names: ["Realty"] }),
                    new Category({ names: ["Savings"] }),
                    new Category({ names: ["Vehicles, chattels"] }),
                ],
            }),

            new Category({
                names: ["Others"],
                children: [
                    new Category({
                        names: ["Missing"],
                        children: [
                            new Category({ names: ["Lent out money"] }),
                            new Category({
                                names: [
                                    "Money returned to owner",
                                    "Returned lent out money",
                                ],
                            }),
                            new Category({
                                names: ["Unknown Expense", "UNKNOWN_CATEGORY"],
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
