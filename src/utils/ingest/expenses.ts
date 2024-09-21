import { makeCategory } from "./Category";

export const createExpensesTree = () =>
    makeCategory({
        names: ["Expenses"],
        children: [
            makeCategory({
                names: ["Food & Beverages", "Food & Drinks"],
                children: [
                    makeCategory({
                        names: ["Bar, Cafe", "Bar, cafe"],
                    }),
                    makeCategory({
                        names: ["Groceries"],
                        children: [makeCategory({ names: ["Meal Kits"] })],
                    }),
                    makeCategory({
                        names: ["Restaurant, fast-food"],
                        children: [
                            makeCategory({ names: ["Deli"] }),
                            makeCategory({ names: ["Food delivery"] }),
                        ],
                    }),
                ],
            }),
            makeCategory({
                names: ["Shopping"],
                children: [
                    makeCategory({
                        names: ["Clothes & Footwear", "Clothes & shoes"],
                    }),
                    makeCategory({ names: ["Drug-store, chemist"] }),
                    makeCategory({ names: ["Electronics, accessories"] }),
                    makeCategory({
                        names: ["Gifts, joy", "Gifts"],
                    }),
                    makeCategory({ names: ["Health and beauty"] }),
                    makeCategory({ names: ["Home, garden"] }),
                    makeCategory({ names: ["Jewels, accessories"] }),
                    makeCategory({ names: ["Kids"] }),
                    makeCategory({ names: ["Leisure time"] }),
                    makeCategory({ names: ["Pets, animals"] }),
                    makeCategory({ names: ["Stationery, tools"] }),
                ],
            }),
            makeCategory({
                names: ["Housing"],
                children: [
                    makeCategory({
                        names: ["Energy, utilities"],
                        children: [
                            makeCategory({ names: ["Electricity"] }),
                            makeCategory({ names: ["Heating"] }),
                        ],
                    }),
                    makeCategory({ names: ["Maintenance, repairs"] }),
                    makeCategory({ names: ["Mortgage"] }),
                    makeCategory({ names: ["Property insurance"] }),
                    makeCategory({ names: ["Rent"] }),
                    makeCategory({ names: ["Services"] }),
                ],
            }),
            makeCategory({
                names: ["Transportation"],
                children: [
                    makeCategory({ names: ["Business trips"] }),
                    makeCategory({ names: ["Long distance"] }),
                    makeCategory({
                        names: ["Public transport"],
                        children: [makeCategory({ names: ["Train"] })],
                    }),
                    makeCategory({ names: ["Taxi"] }),
                ],
            }),
            makeCategory({
                names: ["Vehicle"],
                children: [
                    makeCategory({ names: ["Fuel"] }),
                    makeCategory({ names: ["Leasing"] }),
                    makeCategory({ names: ["Parking"] }),
                    makeCategory({ names: ["Rentals"] }),
                    makeCategory({ names: ["Vehicle insurance"] }),
                    makeCategory({ names: ["Vehicle maintenance"] }),
                ],
            }),
            makeCategory({
                names: ["Life & Entertainment"],
                children: [
                    makeCategory({ names: ["Active sport, fitness"] }),
                    makeCategory({ names: ["Alcohol, tobacco"] }),
                    makeCategory({
                        names: ["Books, audio, subscriptions"],
                    }),
                    makeCategory({
                        names: ["Charity, gifts"],
                        children: [makeCategory({ names: ["Donations"] })],
                    }),
                    makeCategory({ names: ["Culture, sport events"] }),
                    makeCategory({ names: ["Education, development"] }),
                    makeCategory({
                        names: ["Health care, doctor"],
                        children: [
                            makeCategory({
                                names: ["Medical treatment, therapy"],
                            }),
                            makeCategory({ names: ["Medicine"] }),
                        ],
                    }),
                    makeCategory({
                        names: ["Hobbies", "Free time"],
                    }),
                    makeCategory({ names: ["Holiday, trips, hotels"] }),
                    makeCategory({ names: ["Life events"] }),
                    makeCategory({ names: ["Lottery, gambling"] }),
                    makeCategory({ names: ["TV, Streaming"] }),
                    makeCategory({ names: ["Wellness, beauty"] }),
                ],
            }),
            makeCategory({
                names: ["Communication, PC"],
                children: [
                    makeCategory({ names: ["Internet"] }),
                    makeCategory({ names: ["Postal services"] }),
                    makeCategory({
                        names: ["Software, apps, games"],
                        children: [makeCategory({ names: ["Gaming"] })],
                    }),
                    makeCategory({
                        names: ["Telephony, mobile phone", "Phone, cell phone"],
                    }),
                ],
            }),

            makeCategory({
                names: ["Financial expenses"],
                children: [
                    makeCategory({ names: ["Advisory"] }),
                    makeCategory({ names: ["Charges, Fees"] }),
                    makeCategory({ names: ["Child Support"] }),
                    makeCategory({ names: ["Fines"] }),
                    makeCategory({ names: ["Insurances"] }),
                    makeCategory({
                        names: ["Loans, interests", "Loan, interests"],
                    }),
                    makeCategory({
                        names: ["Taxes"],
                        children: [
                            makeCategory({
                                names: ["DDI (Ausschüttungsgleicher Ertrag)"],
                            }),
                        ],
                    }),
                ],
            }),

            makeCategory({
                names: ["Investments"],
                children: [
                    makeCategory({ names: ["Collections"] }),
                    makeCategory({
                        names: ["Financial investments"],
                        children: [makeCategory({ names: ["Crypto"] })],
                    }),
                    makeCategory({ names: ["Realty"] }),
                    makeCategory({ names: ["Savings"] }),
                    makeCategory({ names: ["Vehicles, chattels"] }),
                ],
            }),

            makeCategory({
                names: ["Others"],
                children: [
                    makeCategory({
                        names: ["Missing"],
                        children: [
                            makeCategory({ names: ["Lent out money"] }),
                            makeCategory({
                                names: [
                                    "Money returned to owner",
                                    "Returned lent out money",
                                ],
                            }),
                            makeCategory({
                                names: ["Unknown Expense", "UNKNOWN_CATEGORY"],
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
