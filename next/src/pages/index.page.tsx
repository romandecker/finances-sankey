import { Inter } from "next/font/google";
import {
    Transaction,
    importCsv,
    loadLocalStorage,
    saveLocalStorage,
} from "../utils/storage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sankey } from "./Sankey";
import {
    TransactionRegistry,
    getAccounts,
    makeTransactionRegistry,
} from "../utils/ingest/TransactionRegistry";
import { createIncomeTree } from "../utils/ingest/income";
import { createExpensesTree } from "../utils/ingest/expenses";
import { Filters } from "./Filters";
import {
    FilterMessage,
    InitMessage,
    Message,
    ResultMessage,
} from "../utils/worker";

const inter = Inter({ subsets: ["latin"] });

function useWorker() {
    const [pendingMessageCount, setPendingMessageCount] = useState(0);
    const [filters, setFilters] = useState<Filters>({});
    const [registry, setRegistry] = useState<TransactionRegistry>(
        makeTransactionRegistry(createIncomeTree(), createExpensesTree())
    );
    const workerRef = useRef<Worker>();

    const setTransactions = useCallback((transactions: Transaction[]) => {
        setPendingMessageCount((c) => c + 1);
        workerRef.current?.postMessage({
            type: "INIT",
            transactions,
        } satisfies InitMessage);
    }, []);

    const applyFilters = useCallback((filters: Filters) => {
        setPendingMessageCount((c) => c + 1);
        setFilters(filters);
        workerRef.current?.postMessage({
            type: "FILTER",
            filters,
        } satisfies FilterMessage);
    }, []);

    useEffect(() => {
        workerRef.current = new Worker(
            new URL("../utils/worker.ts", import.meta.url)
        );
        workerRef.current.onmessage = (event: MessageEvent<Message>) => {
            if (event.data.type === "RESULT") {
                setPendingMessageCount((c) => c - 1);
                setRegistry(event.data.registry);
                setFilters((currentFilters) => {
                    // make sure to only set filters when there are none
                    if (currentFilters.accounts) {
                        return currentFilters;
                    }

                    return {
                        accounts: getAccounts(
                            (event as MessageEvent<ResultMessage>).data.registry
                        ),
                    };
                });
            }
        };

        const transactions = loadLocalStorage();
        if (transactions) {
            workerRef.current.postMessage({
                type: "INIT",
                transactions,
            } satisfies InitMessage);
        }

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    return useMemo(
        () => ({
            isLoading: pendingMessageCount === 0,
            setTransactions,
            applyFilters,
            registry,
            filters,
        }),
        [pendingMessageCount === 0, registry, filters]
    );
}

export default function Home() {
    const { isLoading, applyFilters, setTransactions, registry, filters } =
        useWorker();

    return (
        <>
            <div>
                <Button
                    onClick={async () => {
                        const transactions = await importCsv();
                        setTransactions(transactions);
                        saveLocalStorage(transactions);
                    }}
                >
                    Browse...
                </Button>
            </div>
            <Filters
                availableAccounts={getAccounts(registry)}
                filters={filters}
                onFiltersChanged={applyFilters}
            />
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <Sankey registry={registry} />
            )}
        </>
    );
}
