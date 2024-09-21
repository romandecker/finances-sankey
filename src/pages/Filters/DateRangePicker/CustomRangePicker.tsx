import { format, setDate } from "date-fns";
import { Button } from "../../../components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../components/ui/popover";
import { cn } from "../../../lib/utils";
import { DateRange } from "../../../utils/ingest/TransactionRegistry";
import { Calendar } from "../../../components/ui/calendar";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
    value?: Date;
    onChange?: (date?: Date) => void;
}

function DatePicker({ value, onChange }: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

export interface CustomRangePickerProps extends DateRange {
    onChange?: (value: DateRange) => void;
    value: DateRange;
}

export function CustomRangePicker({
    min,
    max,
    onChange,
    value,
}: CustomRangePickerProps) {
    return (
        <>
            <DatePicker
                value={value.min}
                onChange={(newMin) =>
                    onChange?.({ ...value, min: newMin || min })
                }
            />
            <DatePicker
                value={value.max}
                onChange={(newMax) =>
                    onChange?.({ ...value, min: newMax || max })
                }
            />
        </>
    );
}
