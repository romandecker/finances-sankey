import { Filters } from "../pages/Filters";
import {
    TransactionRegistry,
    ingest,
    makeTransactionRegistry,
} from "./ingest/TransactionRegistry";
import { createExpensesTree } from "./ingest/expenses";
import { createIncomeTree } from "./ingest/income";
import { Transaction } from "./storage";

export type InitMessage = {
    type: "INIT";
    transactions: Transaction[];
};

export type FilterMessage = {
    type: "FILTER";
    filters: Filters;
};

export type ResultMessage = {
    type: "RESULT";
    registry: TransactionRegistry;
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
        postMessage({ type: "RESULT", registry } satisfies ResultMessage);
    } else if (event.data.type === "FILTER") {
        registry = makeTransactionRegistry(
            createIncomeTree(),
            createExpensesTree(),
            event.data.filters
        );

        ingest(registry, transactions);
        postMessage({ type: "RESULT", registry } satisfies ResultMessage);
    }
});
