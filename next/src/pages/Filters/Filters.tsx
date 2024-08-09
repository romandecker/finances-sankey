import { Checkbox } from "../../components/ui/checkbox";
import { PropsWithChildren, useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "../../components/ui/card";
import { Transaction } from "../../utils/storage";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { DateRangePicker } from "./DateRangePicker";
import { DateRange } from "../../utils/ingest/TransactionRegistry";
import { isWithinInterval } from "date-fns";
import { CategoryFilter } from "./CategoryFilter";
import { Category } from "../../utils/ingest/Category";

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
                onChange={(e) => {
                    console.log("onChange", e);
                }}
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
    availableDateRange: { min: Date; max: Date };
    availableCategories: { Income: Category; Expenses: Category };

    filters: Filters;
    onFiltersChanged?: (newFilters: Filters) => void;
}

export interface Filters {
    accounts: string[];
    dateRange: { min: Date; max: Date };
    type: Transaction["type"];
}

export function isIncludedByFilters(filters: Filters, tx: Transaction) {
    return (
        filters.type === tx.type &&
        (!filters.accounts || filters.accounts.includes(tx.account)) &&
        (!filters.dateRange ||
            isWithinInterval(tx.date, {
                start: filters.dateRange.min,
                end: filters.dateRange.max,
            }))
    );
}

export function Filters({
    availableAccounts,
    availableDateRange,
    availableCategories,
    filters,
    onFiltersChanged,
}: FiltersProps) {
    const onAccountCheckedChanged = (isChecked: boolean, account: string) => {
        if (isCommandPressed) {
            return onFiltersChanged?.({
                ...filters,
                accounts: [account],
            });
        }
        onFiltersChanged?.({
            ...filters,
            accounts: isChecked
                ? [...(filters.accounts ?? []), account]
                : (filters.accounts ?? []).filter((a) => a !== account),
        });
    };

    const onDateRangeChanged = (dateRange: DateRange) =>
        onFiltersChanged?.({
            ...filters,
            dateRange,
        });

    const [isCommandPressed, setIsCommandPressed] = useState(false);
    useEffect(() => {
        const keyDown = (e: KeyboardEvent) => {
            if (e.key === "Meta" || e.key === "Control") {
                setIsCommandPressed(true);
            }
        };
        const keyUp = (e: KeyboardEvent) => {
            if (e.key === "Meta" || e.key === "Control") {
                setIsCommandPressed(false);
            }
        };

        document.addEventListener("keydown", keyDown);
        document.addEventListener("keyup", keyUp);

        return () => {
            document.removeEventListener("keydown", keyDown);
            document.removeEventListener("keyup", keyUp);
        };
    }, []);

    return (
        <>
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
                <CardContent>
                    <RadioGroup
                        defaultValue="Expenses"
                        onValueChange={(type: Transaction["type"]) =>
                            onFiltersChanged?.({
                                ...filters,
                                type,
                            })
                        }
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="Expenses"
                                id="radio-Expenses"
                            />
                            <label htmlFor="radio-Expenses">Expenses</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Income" id="radio-Income" />
                            <label htmlFor="radio-Income">Income</label>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="p-2">
                    <CardDescription>Time range</CardDescription>
                </CardHeader>
                <CardContent>
                    <DateRangePicker
                        {...availableDateRange}
                        value={filters.dateRange}
                        onChange={onDateRangeChanged}
                    />
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="p-2">
                    <CardDescription>Categories</CardDescription>
                </CardHeader>
                <CardContent>
                    <CategoryFilter root={availableCategories[filters.type]} />
                </CardContent>
            </Card>
        </>
    );
}
