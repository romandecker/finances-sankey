import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useResizeObserver from "use-resize-observer";
import { SankeyData } from "plotly.js";
import { useBreakpoint } from "../utils/useBreakpoint";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export interface SankeyProps {
    label: SankeyData["node"]["label"];
    color: SankeyData["node"]["color"];
    link: SankeyData["link"];
    transactionCount: number;
}

export function Sankey({ label, color, link, transactionCount }: SankeyProps) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const {
        ref,
        width = 100,
        height = 100,
    } = useResizeObserver<HTMLDivElement>();
    const { isMd } = useBreakpoint("md");

    if (!isClient) {
        return null;
    }

    return (
        <div className="flex-1" ref={ref}>
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
                            color,
                        },

                        link,
                    },
                ]}
                layout={{
                    width,
                    height: height - 10,
                    title: `${transactionCount} transactions`,
                    ...(isMd
                        ? {}
                        : {
                              margin: { l: 4, r: 4 },
                              font: { size: 10 },
                          }),
                }}
                useResizeHandler={true}
                config={{ responsive: true }}
            />
        </div>
    );
}
