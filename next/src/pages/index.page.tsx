import { Inter } from "next/font/google";
import {
    importCsv,
    loadLocalStorage,
    saveLocalStorage,
    Transaction,
} from "../utils/storage";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sankey, SankeyProps } from "./Sankey";
import { TransactionRegistry } from "../utils/ingest/TransactionRegistry";
import { Category } from "../utils/ingest/Category.ts";
import { ingest } from "../utils/ingest/ingest";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [sankeyProps, setSankeyProps] = useState<SankeyProps>({
        transactions: [],
        expenses: new TransactionRegistry(
            new Category({ names: ["Expenses"] })
        ),
        income: new TransactionRegistry(new Category({ names: ["Income"] })),
    });

    const loadState = useCallback(
        (transactions: Transaction[]) =>
            setSankeyProps({ transactions, ...ingest(transactions) }),
        [setSankeyProps]
    );

    useEffect(() => {
        const transactions = loadLocalStorage();
        if (transactions) {
            loadState(transactions);
        }
    }, [loadState]);

    return (
        <>
            <p>
                <Button
                    onClick={async () => {
                        const transactions = await importCsv();
                        loadState(transactions);
                        saveLocalStorage(transactions);
                    }}
                >
                    Browse...
                </Button>
            </p>
            <Sankey {...sankeyProps} />
        </>
    );
}
