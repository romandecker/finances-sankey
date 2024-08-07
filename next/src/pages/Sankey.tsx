import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useResizeObserver from "use-resize-observer";
import { SankeyData } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export interface SankeyProps {
    label: SankeyData["node"]["label"];
    link: SankeyData["link"];
    transactionCount: number;
}

export function Sankey({ label, link, transactionCount }: SankeyProps) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const { ref, width = 100 } = useResizeObserver<HTMLDivElement>();
    const height = 1000;

    if (!isClient) {
        return null;
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
                            label,
                        },

                        link,
                    },
                ]}
                layout={{
                    width,
                    height,
                    title: `${transactionCount} transactions`,
                }}
            />
        </div>
    );
}
