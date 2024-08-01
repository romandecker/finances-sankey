import { Inter } from "next/font/google";
import {
    importCsv,
    loadLocalStorage,
    saveLocalStorage,
    Transaction,
} from "../utils/storage";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const transactions = loadLocalStorage();
        if (transactions) {
            setTransactions(transactions);
        }
    }, []);

    return (
        <Button
            onClick={async () => {
                const transactions = await importCsv();
                setTransactions(transactions);
                saveLocalStorage(transactions);
            }}
        >
            Browse...
        </Button>
    );
}
