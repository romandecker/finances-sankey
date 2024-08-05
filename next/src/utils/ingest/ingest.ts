import { Transaction } from "../storage";
import { createExpensesRegistry } from "./expenses";
import { createIncomeRegistry } from "./income";
import { TransactionRegistry } from "./TransactionRegistry";

export interface IngestionResult {
    expenses: TransactionRegistry;
    income: TransactionRegistry;
}

export function ingest(transactions: Transaction[]) {
    const expenses = createExpensesRegistry();
    const income = createIncomeRegistry();

    for (const tx of transactions) {
        if (tx.category === "TRANSFER") {
            continue;
        }

        if (tx.type === "Expenses") {
            expenses.ingest(tx);
        } else {
            income.ingest(tx);
        }
    }

    return { expenses, income };
}
