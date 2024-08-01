import { Transaction } from "../storage";

/**
 * This class takes care of quickly finding categories by name, simply pass a
 * categories (with children) and it will build a map for quick access
 **/
export class CategoryRegistry {
    categories: Record<string, Category>;
    root: Category;

    constructor(root: Category) {
        this.root = root;
        this.categories = {};

        this.register(root);
    }

    get(name: string) {
        return this.categories[name];
    }

    private register(category: Category) {
        for (const name of category.names) {
            if (this.categories[name]) {
                throw new Error(`Duplicate category (or alias) "${name}"`);
            }
            this.categories[name] = category;
        }

        for (const child of category.children) {
            this.register(child);
        }
    }

    ingest(tx: Transaction) {
        const cat = this.get(tx.category);
        cat.addTransaction(tx);
    }
}

interface CategoryOptions {
    names: [string, ...string[]];
    children?: Category[];
}

export class Category {
    names: readonly [string, ...string[]];
    children: Category[];
    private transactions: Transaction[];
    amountInTransactions: number;

    constructor({ names, children = [] }: CategoryOptions) {
        this.names = names;
        this.children = children;
        this.transactions = [];
        this.amountInTransactions = 0;
    }

    get name() {
        return this.names[0];
    }

    addTransaction(transaction: Transaction) {
        this.transactions.push(transaction);
        this.amountInTransactions += transaction.amount;
    }

    calculateTotal(): number {
        return this.children.reduce(
            (acc, cat) => acc + cat.calculateTotal(),
            this.amountInTransactions
        );
    }
}
