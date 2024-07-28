from operator import add
from functools import reduce


class Category:
    def __init__(self, name, children=[]):
        self.name = name
        self.amount = 0
        self.children = children

    def add_transaction(self, amount):
        self.amount += amount

    def calculate_total(self):
        "Return amount of all children (recursively) + own amount"
        return reduce(lambda acc, cat: acc + cat.amount, self, self.amount)

    def __str__(self):
        return f"{self.name} ({self.amount})"

    def __iter__(self):
        "Iterate over self and all children (recursively)"
        yield self
        for child in self.children:
            for item in child:
                yield item


expenses = Category(
    "Expenses",
    [
        Category(
            "Food & Beverages",
            [
                Category("Bar, Cafe"),
                Category("Groceries", [Category("Meal Kits")]),
                Category(
                    "Restaurant, fast-food",
                    [Category("Deli"), Category("Food delivery")],
                ),
            ],
        ),
        Category(
            "Shopping",
            [
                Category("Clothes & Footwear"),
                Category("Drug-store, chemist"),
                Category("Electronics, accessories"),
                Category("Gifts, joy"),
                Category("Health and beauty"),
                Category("Home, garden"),
                Category("Jewels, accessories"),
                Category("Kids"),
                Category("Leisure time"),
                Category("Pets, animals"),
                Category("Stationery, tools"),
            ],
        ),
        Category(
            "Housing",
            [
                Category(
                    "Energy, utilities", [Category("Electricity"), Category("Heating")]
                ),
                Category("Maintenance, repairs"),
                Category("Mortgage"),
                Category("Property insurance"),
                Category("Rent"),
                Category("Services"),
            ],
        ),
        Category(
            "Transportation",
            [
                Category("Business trips"),
                Category("Long distance"),
                Category("Public transport", [Category("Train")]),
                Category("Taxi"),
            ],
        ),
        Category(
            "Vehicle",
            [
                Category("Fuel"),
                Category("Leasing"),
                Category("Parking"),
                Category("Rentals"),
                Category("Vehicle insurance"),
                Category("Vehicle maintenance"),
            ],
        ),
        Category(
            "Life & Entertainment",
            [
                Category("Active sport, fitness"),
                Category("Alcohol, tobacco"),
                Category("Books, audio, subscriptions"),
                Category("Charity, gifts", [Category("Donations")]),
                Category("Culture, sport events"),
                Category("Education, development"),
                Category(
                    "Health care, doctor",
                    [Category("Medical treatment, therapy"), Category("Medicine")],
                ),
                Category("Hobbies"),
                Category("Holiday, trips, hotels"),
                Category("Life events"),
                Category("Lottery, gambling"),
                Category("TV, Streaming"),
                Category("Wellness, beauty"),
            ],
        ),
        Category(
            "Communication, PC",
            [
                Category("Internet"),
                Category("Postal services"),
                Category("Software, apps, games", [Category("Gaming")]),
                Category("Telephony, mobile phone"),
            ],
        ),
        Category(
            "Financial expenses",
            [
                Category("Advisory"),
                Category("Charges, Fees"),
                Category("Child Support"),
                Category("Fines"),
                Category("Insurances"),
                Category("Loans, interests"),
                Category("Taxes", [Category("DDI (Ausschüttungsgleicher Ertrag)")]),
            ],
        ),
        Category(
            "Investments",
            [
                Category("Collections"),
                Category("Financial investments", [Category("Crypto")]),
                Category("Realty"),
                Category("Savings"),
                Category("Vehicles, chattels"),
            ],
        ),
        Category(
            "Others",
            [
                Category(
                    "Missing",
                    [
                        Category("Lent out money"),
                        Category("Returned lent out money"),
                        Category("Temporarily held money intended for another purpose"),
                    ],
                ),
            ],
        ),
    ],
)

income = Category(
    "Income",
    [
        Category("Checks, coupons"),
        Category("Child Support"),
        Category("Dues & grants"),
        Category("Gifts"),
        Category("Interests, dividends"),
        Category("Lending, renting", Category("Splitwise credit")),
        Category("Lottery, gambling"),
        Category("Refunds (tax, purchase)"),
        Category("Rental income"),
        Category("Sale", Category("Sale of securities")),
        Category("Wage, invoices"),
    ],
)
