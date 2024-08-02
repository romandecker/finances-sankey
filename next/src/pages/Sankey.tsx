import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export function Sankey() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <Plot
            data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: "scatter",
                    mode: "lines+markers",
                    marker: { color: "red" },
                },
                { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
            ]}
            layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
        />
    );
}
