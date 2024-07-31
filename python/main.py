import plotly.graph_objects as go
from categories import expenses
import csv
import argparse
import sys

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("csv_filepath")
    parser.add_argument("--currency", default="EUR")
    args = parser.parse_args()

    with open(args.csv_filepath, "r", newline="") as csvfile:
        reader = csv.DictReader(csvfile, delimiter=";", quotechar='"')
        num_transfers = 0
        num_currency_errors = 0
        for i, row in enumerate(reader):

            if row["type"] == "Expenses":
                currency = row["currency"]
                if currency != args.currency:
                    num_currency_errors += 1
                    continue

                if row["category"] == "TRANSFER":
                    num_transfers += 1
                    continue

                try:
                    amount = abs(float(row["amount"]))
                    expenses.add_transaction(amount, row["category"])
                except Exception as err:
                    print(f"Warning: {err}")

    if num_currency_errors > 0:
        print(
            f"Warning: Couldn't import {num_currency_errors} records due to mismatching currency"
        )

    if num_transfers > 0:
        print(f"Warning: Couldn't import {num_transfers} transfers (not supported)")

    labels = [cat.name for cat in expenses]
    source = []
    value = []
    target = []

    # TODO: Need a way to filter out certain things: When buying a stock for 100, then selling for 100 and buying for 100 again, it will show up as 200 in expenses...
    for i, name in enumerate(labels):
        cat = expenses.find_by_name(name)
        for direct_child in cat.children:
            child_index = labels.index(direct_child.name)
            source.append(i)
            value.append(direct_child.calculate_total())
            target.append(child_index)

    fig = go.Figure(
        data=[
            go.Sankey(
                node=dict(
                    pad=15,
                    thickness=20,
                    line=dict(color="black", width=0.5),
                    label=labels,
                    color="blue",
                ),
                link=dict(
                    # indices correspond to labels, eg A1, A2, A1, B1, ...
                    source=source,
                    value=value,
                    target=target,
                ),
            )
        ]
    )
    fig.show()
