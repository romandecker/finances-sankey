import { createPicker } from "hashpick";

export const colors = [
    "#92fd8b",
    "#45e832",
    "#3dcc2c",
    "#34b026",
    "#2d9820",
    "#247a1a",
    "#1e6415",
    "#174c10",
    "#0f310a",
    "#071605",
    "#81fdb4",
    "#32e78b",
    "#2bca7a",
    "#26b06a",
    "#209459",
    "#1a7a4a",
    "#15623b",
    "#104c2e",
    "#0a311e",
    "#05160d",
    "#a3f1fd",
    "#33def0",
    "#2dc4d4",
    "#27a9b7",
    "#218f9b",
    "#1c7780",
    "#165f67",
    "#10464c",
    "#0a2d31",
    "#082326",
    "#dee4fe",
    "#bdc9fd",
    "#9aaffd",
    "#7595fc",
    "#477afc",
    "#2f64db",
    "#2650af",
    "#142a5d",
    "#0b1836",
    "#e6e1fe",
    "#cec4fd",
    "#b7a6fd",
    "#a088fd",
    "#8b68fc",
    "#7643fc",
    "#5f2ed5",
    "#4823a2",
    "#321870",
    "#f8dbfe",
    "#f3b6fd",
    "#ee8efd",
    "#e95dfc",
    "#d632ea",
    "#b129c1",
    "#8c2199",
    "#6e1a78",
    "#4b1252",
    "#2d0a31",
    "#fedce8",
    "#fdb8d2",
    "#fd90bd",
    "#fc62a8",
    "#ee3391",
    "#c42a78",
    "#9e2260",
    "#781a49",
    "#521232",
    "#310a1e",
    "#fedddc",
    "#fdbbb7",
    "#fc6b61",
    "#ed4533",
    "#c4392a",
    "#9e2e22",
    "#78231a",
    "#521812",
    "#310e0a",
    "#fde1b7",
    "#fcc249",
    "#e0aa30",
    "#c09229",
    "#a27b23",
    "#86661d",
    "#6b5117",
    "#503d11",
    "#3a2c0c",
    "#261d08",
    "#bef735",
    "#aadc2f",
    "#95c129",
    "#82a924",
    "#6d8e1e",
    "#587319",
    "#435813",
    "#37470f",
    "#26310a",
    "#111605",
] as const;

export const pickColor = createPicker(colors);
