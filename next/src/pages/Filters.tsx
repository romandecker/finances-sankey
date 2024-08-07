import { Checkbox } from "../components/ui/checkbox";
import { PropsWithChildren } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "../components/ui/card";
import { Transaction } from "../utils/storage";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

function FilterCheckbox({
    id,
    children,
    onChange,
    isChecked,
}: PropsWithChildren<{
    id: string;
    onChange?: (isChecked: boolean, id: string) => void;
    isChecked?: boolean;
}>) {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                id={id}
                onCheckedChange={(checkedState) =>
                    onChange?.(checkedState === true, id)
                }
                checked={isChecked}
            />
            <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {children}
            </label>
        </div>
    );
}

export interface FiltersProps {
    availableAccounts: string[];

    filters: Filters;
    onFiltersChanged?: (newFilters: Filters) => void;
}

export interface Filters {
    accounts?: string[];
    type: Transaction["type"];
}

export function isIncludedByFilters(filters: Filters, tx: Transaction) {
    return (
        filters.type === tx.type &&
        (!filters.accounts || filters.accounts.includes(tx.account))
    );
}

export function Filters({
    availableAccounts,
    filters,
    onFiltersChanged,
}: FiltersProps) {
    const onAccountCheckedChanged = (isChecked: boolean, account: string) =>
        onFiltersChanged?.({
            ...filters,
            accounts: isChecked
                ? [...(filters.accounts ?? []), account]
                : (filters.accounts ?? []).filter((a) => a !== account),
        });

    const onTypeChanged = () => {};

    return (
        <div className="flex flex-row gap-2 p-2">
            <Card>
                <CardHeader className="p-2">
                    <CardDescription>Accounts</CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-1 p-2">
                    {availableAccounts.map((account) => (
                        <FilterCheckbox
                            id={account}
                            key={account}
                            onChange={onAccountCheckedChanged}
                            isChecked={filters.accounts?.includes(account)}
                        >
                            {account}
                        </FilterCheckbox>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="p-2">
                    <CardDescription>Type</CardDescription>
                </CardHeader>
                <CardHeader>
                    <RadioGroup
                        defaultValue="Expenses"
                        onChange={(e) => console.log("#####", e)}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                onChange={(e) => console.log("#####", e)}
                                value="Expenses"
                                id="radio-Expenses"
                            />
                            <label htmlFor="radio-Expenses">Expenses</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="Income"
                                id="radio-Income"
                                onChange={(e) => console.log("#####", e)}
                            />
                            <label htmlFor="radio-Income">Income</label>
                        </div>
                    </RadioGroup>
                </CardHeader>
            </Card>
        </div>
    );
}
