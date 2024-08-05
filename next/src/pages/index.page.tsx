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
import { createIncomeTree } from "../utils/ingest/income";
import { createExpensesTree } from "../utils/ingest/expenses";
import { Filters } from "./Filters";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [sankeyProps, setSankeyProps] = useState<SankeyProps>({
        transactions: [],
        registry: new TransactionRegistry(
            createIncomeTree(),
            createExpensesTree()
        ),
    });

    const loadState = useCallback(
        (transactions: Transaction[]) => {
            const registry = new TransactionRegistry(
                createIncomeTree(),
                createExpensesTree()
            );
            registry.ingest(transactions);
            setSankeyProps({ transactions, registry });
        },
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
            <div>
                <Button
                    onClick={async () => {
                        const transactions = await importCsv();
                        loadState(transactions);
                        saveLocalStorage(transactions);
                    }}
                >
                    Browse...
                </Button>
            </div>
            <Filters
                availableAccounts={[...sankeyProps.registry.getAccounts()]}
                filters={{ accounts: [] }}
            ></Filters>
            <Sankey {...sankeyProps} />
        </>
    );
}
