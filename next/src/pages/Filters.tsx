import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { RadioGroup } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { PropsWithChildren } from "react";
import { Card, CardContent } from "../components/ui/card";

function FilterCheckbox({
    id,
    children,
    onChange,
}: PropsWithChildren<{
    id: string;
    onChange?: (isChecked: boolean, id: string) => void;
}>) {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                id={id}
                onCheckedChange={(checkedState) =>
                    onChange?.(checkedState === true, id)
                }
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
    accounts: string[];
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
                ? [...filters.accounts, account]
                : filters.accounts.filter((a) => a !== account),
        });

    return (
        <div className="flex flex-row gap-2">
            <Card>
                <CardContent className="flex flex-col gap-1 p-2">
                    {availableAccounts.map((account) => (
                        <FilterCheckbox
                            id={account}
                            onChange={onAccountCheckedChanged}
                        >
                            {account}
                        </FilterCheckbox>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
