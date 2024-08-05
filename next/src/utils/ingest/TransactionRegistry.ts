import { Transaction } from "../storage";
import { Category } from "./Category";

interface Transfer {
    from: string;
    to: string;
    amount: number;
}

const OPPOSITE_TYPES = {
    Income: "Expenses",
    Expenses: "Income",
} as const;

/**
 * This class takes care of quickly finding categories by name, simply pass a
 * categories (with children) and it will build a map for quick access
 **/
export class TransactionRegistry {
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

    constructor(incomeTree: Category, expensesTree: Category) {
        this.roots = {
            Income: {
                root: incomeTree,
                categories: {},
            },
            Expenses: {
                root: expensesTree,
                categories: {},
            },
        };
        this.accounts = new Set();
        this.accountTransfers = [];
        this.register(incomeTree);
        this.register(expensesTree);
    }

    get(name: string, type: Transaction["type"] = "Expenses") {
        return this.roots[type].categories[name];
    }

    getAccounts() {
        return [...this.accounts].sort();
    }

    private register(category: Category) {
        for (const name of category.names) {
            if (this.roots[category.type].categories[name]) {
                throw new Error(`Duplicate category (or alias) "${name}"`);
            }
            this.roots[category.type].categories[name] = category;
        }

        for (const child of category.children) {
            this.register(child);
        }
    }

    private ingestTransfer(openTransfers: Transaction[], tx: Transaction) {
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

            this.accountTransfers.push({
                from: sourceTx.account,
                to: destTx.account,
                amount: destTx.amount,
            });

            this.accounts.add(sourceTx.account);
            this.accounts.add(destTx.account);

            openTransfers.splice(oppositeIndex, 1);
        } else {
            openTransfers.push(tx);
        }
    }

    ingest(transactions: Transaction[]) {
        const openTransfers: Transaction[] = [];

        for (const tx of transactions) {
            if (tx.transfer) {
                this.ingestTransfer(openTransfers, tx);
                continue;
            }

            const cat = this.get(tx.category, tx.type);

            if (!cat) {
                console.warn(
                    `Unknown ${tx.type} category "${tx.category}" for transaction`,
                    tx
                );
                continue;
            }
            this.accounts.add(tx.account);
            cat.addTransaction(tx);
        }

        if (openTransfers.length) {
            console.warn(
                "Encountered some transfers without matching pairs:",
                openTransfers.map((tx) => `${tx.amount} ${tx.note}`)
            );
        }
    }
}
