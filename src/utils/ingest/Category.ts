import { Transaction } from "../storage";

interface CategoryOptions {
    names: [string, ...string[]];
    children?: Category[];
    type?: Transaction["type"];
}

export interface Category {
    names: [string, ...string[]];
    children: Category[];
    transactions: Transaction[];
    amountInTransactions: number;
    type: Transaction["type"];

    accounts: Record<string, number>;
}

export function makeCategory({
    names,
    children = [],
    type = "Expenses",
}: CategoryOptions) {
    return {
        names,
        children,
        type,

        transactions: [],
        accounts: {},
        amountInTransactions: 0,
    };
}

/**
 * Create a clone of the current category and all its children, without any transactions
 */
export function emptyDeepClone(original: Category): Category {
    const clone = makeCategory({
        names: [...original.names],
        children: original.children.map(emptyDeepClone),
        type: original.type,
    });

    return clone;
}

export function getName(cat: Category) {
    return cat.names[0];
}

export function addTransaction(cat: Category, transaction: Transaction) {
    cat.transactions.push(transaction);
    if (!cat.accounts[transaction.account]) {
        cat.accounts[transaction.account] = 0;
    }
    cat.accounts[transaction.account] += transaction.amount;
    cat.amountInTransactions += transaction.amount;
}

export function calculateTotal(root: Category): number {
    return root.children.reduce(
        (acc, cat) => acc + calculateTotal(cat),
        root.amountInTransactions
    );
}

export function collect(category: Category) {
    const categories = [category];

    for (const child of category.children) {
        categories.push(...collect(child));
    }

    return categories;
}
