import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { RadioGroup } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";

export interface FiltersProps {
    availableAccounts: string[];

    filters: Filters;
}

export interface Filters {
    accounts: string[];
}

export function Filters({ availableAccounts }: FiltersProps) {
    return (
        <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
            </div>
        </RadioGroup>
    );
}
