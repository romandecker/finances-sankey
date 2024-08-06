/**
 * This interface takes care of quickly finding categories by name, simply pass a
 * categories (with children) and it will build a map for quick access
 **/

import { Filters, isIncludedByFilters } from "../../pages/Filters";
import { Transaction } from "../storage";
import { Category, addTransaction } from "./Category";

interface Transfer {
    from: string;
    to: string;
    amount: number;
}

const OPPOSITE_TYPES = {
    Income: "Expenses",
    Expenses: "Income",
} as const;

export interface TransactionRegistry {
    roots: {
        Income: {
            root: Category;
            categories: Record<string, Category>;
        };
        Expenses: {
            root: Category;
            categories: Record<string, Category>;
        };
    };

    accounts: Set<string>;
    accountTransfers: Transfer[];
    ingestedTransactions: Transaction[];
    filters: Filters;
}

export function makeTransactionRegistry(
    incomeTree: Category,
    expensesTree: Category,
    filters: Filters = {}
) {
    const registry = {
        roots: {
            Income: {
                root: incomeTree,
                categories: {},
            },
            Expenses: {
                root: expensesTree,
                categories: {},
            },
        },
        accounts: new Set<string>(),
        accountTransfers: [],
        ingestedTransactions: [],
        filters,
    };

    register(registry, incomeTree);
    register(registry, expensesTree);

    return registry;
}

function register(registry: TransactionRegistry, category: Category) {
    for (const name of category.names) {
        if (registry.roots[category.type].categories[name]) {
            throw new Error(`Duplicate category (or alias) "${name}"`);
        }
        registry.roots[category.type].categories[name] = category;
    }

    for (const child of category.children) {
        register(registry, child);
    }
}

export function getCategory(
    registry: TransactionRegistry,
    name: string,
    type: Transaction["type"] = "Expenses"
) {
    return registry.roots[type].categories[name];
}

export function getAccounts(registry: TransactionRegistry) {
    return [...registry.accounts].sort();
}

function ingestTransfer(
    registry: TransactionRegistry,
    openTransfers: Transaction[],
    tx: Transaction
) {
    const oppositeType = OPPOSITE_TYPES[tx.type];
    const oppositeIndex = openTransfers.findIndex(
        (candidate) =>
            candidate.type === oppositeType &&
            candidate.currency === tx.currency &&
            candidate.amount === -tx.amount
    );

    if (oppositeIndex >= 0) {
        const [sourceTx, destTx] =
            tx.type === "Expenses"
                ? [tx, openTransfers[oppositeIndex]]
                : [openTransfers[oppositeIndex], tx];

        registry.accountTransfers.push({
            from: sourceTx.account,
            to: destTx.account,
            amount: destTx.amount,
        });

        registry.accounts.add(sourceTx.account);
        registry.accounts.add(destTx.account);

        openTransfers.splice(oppositeIndex, 1);
    } else {
        openTransfers.push(tx);
    }
}

export function ingest(
    registry: TransactionRegistry,
    transactions: Transaction[]
) {
    const openTransfers: Transaction[] = [];

    for (const tx of transactions) {
        registry.ingestedTransactions.push(tx);
        registry.accounts.add(tx.account);

        if (!isIncludedByFilters(registry.filters, tx)) {
            // console.log("skipped", tx);
            continue;
        }

        if (tx.transfer) {
            ingestTransfer(registry, openTransfers, tx);
            continue;
        }

        const cat = getCategory(registry, tx.category, tx.type);

        if (!cat) {
            console.warn(
                `Unknown ${tx.type} category "${tx.category}" for transaction`,
                tx
            );
            continue;
        }
        addTransaction(cat, tx);
    }

    if (!registry.filters.accounts) {
        registry.filters.accounts = getAccounts(registry);
    }

    if (openTransfers.length) {
        console.warn(
            "Encountered some transfers without matching pairs:",
            openTransfers.map((tx) => `${tx.amount} ${tx.note}`)
        );
    }
}
