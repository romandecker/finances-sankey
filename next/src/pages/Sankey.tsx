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
    const {
        ref,
        width = 100,
        height = 100,
    } = useResizeObserver<HTMLDivElement>();
    // const height = 300;
    // console.log(height);

    if (!isClient) {
        return null;
    }

    return (
        <div className="flex-1 overflow-hidden" ref={ref}>
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
                    height: height - 10,
                    title: `${transactionCount} transactions`,
                }}
            />
        </div>
    );
}
