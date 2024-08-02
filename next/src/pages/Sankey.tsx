import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useResizeObserver from "use-resize-observer";
import { Transaction } from "../utils/storage";
import { IngestionResult } from "../utils/categories/ingest";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export interface SankeyProps extends IngestionResult {
    transactions: Transaction[];
}

export function Sankey({ transactions, income, expenses }: SankeyProps) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const { ref, width = 100 } = useResizeObserver<HTMLDivElement>();
    const height = 1000;

    if (!isClient) {
        return null;
    }

    const categories = [...new Set(Object.values(income.categories))];
    const labels = categories.map((cat) => cat.name);
    const source: number[] = [];
    const target: number[] = [];
    const value: number[] = [];
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        for (const child of category.children) {
            const childIndex = labels.indexOf(child.name);
            source.push(childIndex);
            value.push(child.calculateTotal());
            target.push(i);
        }
    }

    const offset = categories.length;

    source.push(0);
    value.push(income.root.calculateTotal());
    target.push(offset);

    const expenseCategories = [...new Set(Object.values(expenses.categories))];
    const expenseLabels = expenseCategories.map((cat) => cat.name);
    categories.push(...expenseCategories);
    labels.push(...expenseLabels);
    for (let i = offset; i < categories.length; i++) {
        const category = categories[i];
        for (const child of category.children) {
            const childIndex = offset + expenseLabels.indexOf(child.name);
            source.push(i);
            value.push(-child.calculateTotal());
            target.push(childIndex);
        }
    }

    console.log("total categories", categories.length);

    return (
        <div className="w-full" ref={ref}>
            <Plot
                data={[
                    {
                        type: "sankey",
                        orientation: "h",
                        node: {
                            pad: 15,
                            thickness: 30,
                            line: {
                                color: "black",
                                width: 0.5,
                            },
                            label: labels,
                        },

                        link: {
                            source,
                            target,
                            value,
                        },
                    },
                ]}
                layout={{
                    width,
                    height,
                    title: `${transactions.length} transactions`,
                }}
            />
        </div>
    );
}
