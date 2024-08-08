import { Filters } from "../pages/Filters/Filters";
import { SankeyProps } from "../pages/Sankey";
import {
    TransactionRegistry,
    createSankeyData,
    ingest,
    makeTransactionRegistry,
} from "./ingest/TransactionRegistry";
import { createExpensesTree } from "./ingest/expenses";
import { createIncomeTree } from "./ingest/income";
import { Transaction } from "./storage";

export type InitMessage = {
    type: "INIT";
    transactions: Transaction[];
    id: number;
};

export type FilterMessage = {
    type: "FILTER";
    filters: Filters;
    id: number;
};

export type ResultMessage = {
    type: "RESULT";
    id: number;
    registry: TransactionRegistry;
    sankeyData: SankeyProps;
};

export type Message = InitMessage | FilterMessage | ResultMessage;

let transactions: Transaction[];
let registry: TransactionRegistry;

addEventListener("message", (event: MessageEvent<Message>) => {
    if (event.data.type === "INIT") {
        registry = makeTransactionRegistry(
            createIncomeTree(),
            createExpensesTree()
        );

        transactions = event.data.transactions;
        ingest(registry, event.data.transactions);
        postMessage({
            type: "RESULT",
            registry,
            sankeyData: createSankeyData(registry),
            id: event.data.id,
        } satisfies ResultMessage);
    } else if (event.data.type === "FILTER") {
        registry = makeTransactionRegistry(
            createIncomeTree(),
            createExpensesTree(),
            event.data.filters
        );

        ingest(registry, transactions);
        postMessage({
            type: "RESULT",
            registry,
            sankeyData: createSankeyData(registry),
            id: event.data.id,
        } satisfies ResultMessage);
    }
});
