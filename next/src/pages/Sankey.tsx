import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useResizeObserver from "use-resize-observer";
import { TransactionRegistry } from "../utils/ingest/TransactionRegistry";
import { calculateTotal, getName } from "../utils/ingest/Category";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export interface SankeyProps {
    registry: TransactionRegistry;
}

export function Sankey({ registry }: SankeyProps) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const { ref, width = 100 } = useResizeObserver<HTMLDivElement>();
    const height = 1000;

    if (!isClient) {
        return null;
    }

    const categories = [
        ...new Set(Object.values(registry.roots.Income.categories)),
    ];
    const labels = categories.map(getName);
    const source: number[] = [];
    const target: number[] = [];
    const value: number[] = [];
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        for (const child of category.children) {
            const childIndex = labels.indexOf(getName(child));
            source.push(childIndex);
            value.push(calculateTotal(child));
            target.push(i);
        }
    }

    const offset = categories.length;

    source.push(0);
    value.push(calculateTotal(registry.roots.Income.root));
    target.push(offset);

    const expenseCategories = [
        ...new Set(Object.values(registry.roots.Expenses.categories)),
    ];
    const expenseLabels = expenseCategories.map((cat) => getName(cat));
    categories.push(...expenseCategories);
    labels.push(...expenseLabels);
    for (let i = offset; i < categories.length; i++) {
        const category = categories[i];
        for (const child of category.children) {
            const childIndex = offset + expenseLabels.indexOf(getName(child));
            source.push(i);
            value.push(-calculateTotal(child));
            target.push(childIndex);
        }
    }

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
                    title: `${registry.ingestedTransactions.length} transactions`,
                }}
            />
        </div>
    );
}
