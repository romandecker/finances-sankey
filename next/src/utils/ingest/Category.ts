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
    cat.amountInTransactions += transaction.amount;
}

export function calculateTotal(root: Category): number {
    return root.children.reduce(
        (acc, cat) => acc + calculateTotal(cat),
        root.amountInTransactions
    );
}
