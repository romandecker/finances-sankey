import { Transaction } from "../storage";
import { CategoryRegistry } from "./category";
import { createExpensesRegistry } from "./expenses";
import { createIncomeRegistry } from "./income";

export interface IngestionResult {
    expenses: CategoryRegistry;
    income: CategoryRegistry;
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
