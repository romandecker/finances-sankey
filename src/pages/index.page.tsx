import { Button } from "@/components/ui/button";
import { endOfYear, startOfYear } from "date-fns";
import { FolderOpenDotIcon } from "lucide-react";
import { Inter } from "next/font/google";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    TransactionRegistry,
    getAccounts,
    getCategoryNames,
    getDateRange,
    makeTransactionRegistry,
} from "../utils/ingest/TransactionRegistry";
import { makeDefaultOntology } from "../utils/ingest/parseCategories";
import {
    Transaction,
    importCsv,
    loadLocalStorage,
    saveLocalStorage,
} from "../utils/storage";
import {
    FilterMessage,
    InitMessage,
    Message,
    ResultMessage,
} from "../utils/worker";
import { Filters } from "./Filters/Filters";
import { Sankey, SankeyProps } from "./Sankey";
import { Sidebar } from "./Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

interface WorkerContext {
    registry: TransactionRegistry;
    sankeyData?: SankeyProps;
}

function useWorker() {
    const currentMessageIdRef = useRef(0);
    const lastMessageIdRef = useRef(0);
    const [filters, setFilters] = useState<Filters>();
    const [context, setWorkerContext] = useState<WorkerContext>({
        registry: makeTransactionRegistry(makeDefaultOntology()),
    });
    const workerRef = useRef<Worker>();

    const postMessage = useCallback(
        <M extends Message>(message: Omit<M, "id">) => {
            currentMessageIdRef.current++;
            const msg = {
                ...message,
                id: currentMessageIdRef.current,
            };
            console.log("Sending message", msg);
            workerRef.current?.postMessage(msg);
        },
        []
    );

    const setTransactions = useCallback(
        (transactions: Transaction[]) => {
            postMessage<InitMessage>({
                type: "INIT",
                transactions,
            });
        },
        [postMessage]
    );

    const applyFilters = useCallback(
        (filters: Filters) => {
            setFilters(filters);
            postMessage<FilterMessage>({
                type: "FILTER",
                filters,
            });
        },
        [postMessage]
    );

    useEffect(() => {
        workerRef.current = new Worker(
            new URL("../utils/worker.ts", import.meta.url)
        );
        workerRef.current.onmessage = (event: MessageEvent<Message>) => {
            lastMessageIdRef.current = event.data.id;
            if (event.data.type === "RESULT") {
                if (currentMessageIdRef.current !== lastMessageIdRef.current) {
                    console.warn("Skipping stale message", event.data);
                    return;
                }

                const registry = event.data.registry;
                setWorkerContext(event.data);
                const maxRange = getDateRange(registry);
                setFilters((currentFilters) => {
                    // if we already have filters, don't overwrite them
                    if (currentFilters) {
                        return currentFilters;
                    }

                    return {
                        accounts: getAccounts(
                            (event as MessageEvent<ResultMessage>).data.registry
                        ),
                        type: "Expenses",
                        dateRange: {
                            min: startOfYear(maxRange.max),
                            max: endOfYear(maxRange.max),
                        },
                        categories: getCategoryNames(registry),
                    } satisfies Filters;
                });
            }
        };

        const transactions = loadLocalStorage();
        if (transactions) {
            postMessage<InitMessage>({
                type: "INIT",
                transactions,
            });
        }

        return () => {
            workerRef.current?.terminate();
        };
    }, [postMessage]);

    const isLoading = currentMessageIdRef.current !== lastMessageIdRef.current;

    return useMemo(
        () => ({
            isLoading,
            setTransactions,
            applyFilters,
            filters,
            ...context,
        }),
        [isLoading, context, filters, applyFilters, setTransactions]
    );
}

export default function Home() {
    const {
        isLoading,
        applyFilters,
        setTransactions,
        registry,
        filters,
        sankeyData,
    } = useWorker();

    return (
        <div className="flex flex-row min-h-screen">
            <Sidebar>
                {filters && (
                    <Filters
                        availableAccounts={getAccounts(registry)}
                        availableDateRange={getDateRange(registry)}
                        availableCategories={{
                            Income: registry.roots.Income.root,
                            Expenses: registry.roots.Expenses.root,
                        }}
                        filters={filters}
                        onFiltersChanged={applyFilters}
                    />
                )}
            </Sidebar>
            <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-2xl">Your finances sankey</h1>
                    <Button
                        onClick={async () => {
                            const transactions = await importCsv();
                            setTransactions(transactions);
                            saveLocalStorage(transactions);
                        }}
                    >
                        <FolderOpenDotIcon />
                        &nbsp;Browse
                    </Button>
                </div>
                {isLoading || !sankeyData ? (
                    <span>Loading...</span>
                ) : (
                    <Sankey {...sankeyData} />
                )}
            </div>
        </div>
    );
}
