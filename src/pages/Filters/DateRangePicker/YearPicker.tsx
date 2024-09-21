import { eachYearOfInterval, getYear } from "date-fns";
import { DateRange } from "../../../utils/ingest/TransactionRegistry";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";

export interface YearPickerProps extends DateRange {
    onChange?: (value: number) => void;
    value: number;
}

export function YearPicker({ min, max, onChange, value }: YearPickerProps) {
    const years = eachYearOfInterval({ start: min, end: max });
    return (
        <Select
            value={value.toString()}
            onValueChange={(year) => onChange?.(+year)}
        >
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {years.map((year) => (
                    <SelectItem
                        key={getYear(year)}
                        value={getYear(year).toString()}
                    >
                        {getYear(year).toString()}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
