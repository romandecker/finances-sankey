import { Transaction } from "../storage";
import { Category } from "./Category";

/**
 * This class takes care of quickly finding categories by name, simply pass a
 * categories (with children) and it will build a map for quick access
 **/
export class TransactionRegistry {
    categories: Record<string, Category>;
    rootCategory: Category;
    accounts: Set<string>;

    constructor(root: Category) {
        this.rootCategory = root;
        this.categories = {};
        this.accounts = new Set();

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
        if (!cat) {
            console.warn(
                `Unknown ${tx.type} category "${tx.category}" for transaction`,
                tx
            );
            return;
        }
        this.accounts.add(tx.account);
        cat.addTransaction(tx);
    }
}
