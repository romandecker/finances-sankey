import {
    addMonths,
    eachMonthOfInterval,
    endOfMonth,
    endOfYear,
    format,
    getYear,
    setYear,
    startOfMonth,
    startOfYear,
} from "date-fns";
import { DateRange } from "../../../utils/ingest/TransactionRegistry";
import { YearPicker } from "./YearPicker";
import { Button } from "../../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";

export interface MonthPickerProps extends DateRange {
    onChange?: (value: DateRange) => void;
    value: DateRange;
}

export function MonthPicker({ min, max, onChange, value }: MonthPickerProps) {
    const months = eachMonthOfInterval({
        start: startOfYear(value.min),
        end: endOfYear(value.min),
    });

    return (
        <div className="flex flex-col gap-1">
            <YearPicker
                min={min}
                max={max}
                value={getYear(value.min)}
                onChange={(year) => {
                    onChange?.({
                        min: setYear(value.min, year),
                        max: setYear(value.max, year),
                    });
                }}
            />
            <div className="flex flex-row gap-1">
                <Button
                    onClick={() => {
                        const min = startOfMonth(addMonths(value.min, -1));
                        onChange?.({ min: min, max: endOfMonth(min) });
                    }}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Select
                    value={startOfMonth(value.min).toISOString()}
                    onValueChange={(value) =>
                        onChange?.({
                            min: startOfMonth(value),
                            max: endOfMonth(value),
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {months.map((month) => (
                            <SelectItem
                                key={month.toISOString()}
                                value={month.toISOString()}
                            >
                                {format(month, "MMMM")}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button
                    onClick={() => {
                        const min = startOfMonth(addMonths(value.min, 1));
                        onChange?.({ min: min, max: endOfMonth(min) });
                    }}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
