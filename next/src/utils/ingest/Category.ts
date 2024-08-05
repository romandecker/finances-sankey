import { Transaction } from "../storage";

interface CategoryOptions {
    names: [string, ...string[]];
    children?: Category[];
    type?: Transaction["type"];
}

export class Category {
    names: readonly [string, ...string[]];
    children: Category[];
    private transactions: Transaction[];
    amountInTransactions: number;
    type: Transaction["type"];

    constructor({ names, children = [], type = "Expenses" }: CategoryOptions) {
        this.names = names;
        this.children = children;
        this.transactions = [];
        this.amountInTransactions = 0;
        this.type = type;
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
