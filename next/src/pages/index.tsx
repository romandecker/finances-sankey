import { Inter } from "next/font/google";
import {
    importCsv,
    loadLocalStorage,
    saveLocalStorage,
    Transaction,
} from "../utils/storage";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Category, CategoryRegistry } from "../utils/categories/category";
import { ingest, IngestionResult } from "../utils/categories/ingest";

const inter = Inter({ subsets: ["latin"] });

interface AppState extends IngestionResult {
    transactions: Transaction[];
}

export default function Home() {
    const [appState, setAppState] = useState<AppState>({
        transactions: [],
        expenses: new CategoryRegistry(new Category({ names: ["Expenses"] })),
        income: new CategoryRegistry(new Category({ names: ["Income"] })),
    });

    const loadState = useCallback(
        (transactions: Transaction[]) =>
            setAppState({ transactions, ...ingest(transactions) }),
        [setAppState]
    );

    useEffect(() => {
        const transactions = loadLocalStorage();
        if (transactions) {
            loadState(transactions);
        }
    }, [loadState]);

    return (
        <Button
            onClick={async () => {
                const transactions = await importCsv();
                loadState(transactions);
            }}
        >
            Browse...
        </Button>
    );
}
