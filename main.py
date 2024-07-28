import plotly.graph_objects as go
from categories import expenses

fig = go.Figure(
    data=[
        go.Sankey(
            node=dict(
                pad=15,
                thickness=20,
                line=dict(color="black", width=0.5),
                label=[
                    "Roman",
                    "Dani",
                    "Budget",
                    "Housing",
                    "Rent",
                    "Heating",
                    "Electricity",
                ],
                color="blue",
            ),
            link=dict(
                # indices correspond to labels, eg A1, A2, A1, B1, ...
                source=[0, 1, 2, 3, 3, 3],
                value=[3000, 2000, 2500, 2000, 250, 250],
                target=[2, 2, 3, 4, 5, 6],
            ),
        )
    ]
)

# fig.update_layout(title_text="Basic Sankey Diagram", font_size=10)
# fig.show()

if __name__ == "__main__":
    n = 2
    for cat in expenses:
        cat.add_transaction(n)
        print(cat)

    print("Sum %s" % expenses.calculate_total())


# fig.write_html("first_figure.html", auto_open=True)
