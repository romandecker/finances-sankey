import { Inter } from "next/font/google";
import { loadCsv } from "../utils/storage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <button
            onClick={async () => {
                await loadCsv();
            }}
        >
            Browse...
        </button>
    );
}
