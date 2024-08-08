"use client";

import * as React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import {
    addMonths,
    eachMonthOfInterval,
    eachYearOfInterval,
    endOfMonth,
    endOfYear,
    format,
    getYear,
    setYear,
    startOfMonth,
    startOfYear,
} from "date-fns";
import { DateRange } from "../../utils/ingest/TransactionRegistry";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface YearPickerProps extends DateRange {
    onChange?: (value: number) => void;
    value: number;
}

function YearPicker({ min, max, onChange, value }: YearPickerProps) {
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

interface MonthPickerProps extends DateRange {
    onChange?: (value: DateRange) => void;
    value: DateRange;
}

function MonthPicker({ min, max, onChange, value }: MonthPickerProps) {
    const months = eachMonthOfInterval({
        start: startOfYear(value.min),
        end: endOfYear(value.min),
    });

    return (
        <div className="flex gap-1">
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
            <Button
                onClick={() => {
                    const min = startOfMonth(addMonths(value.min, 1));
                    onChange?.({ min: min, max: endOfMonth(min) });
                }}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

export interface DateRangePickerProps extends DateRange {
    onChange?: (range: DateRange) => void;
    value: DateRange;
}

const RANGE_TYPES = ["year", "month", "week"] as const;
type RangeType = (typeof RANGE_TYPES)[number];

export function DateRangePicker({
    min,
    max,
    onChange,
    value,
}: DateRangePickerProps) {
    const [rangeType, setRangeType] = React.useState<RangeType>("year");
    return (
        <>
            <Select
                value={rangeType}
                onValueChange={(val) => setRangeType(val as RangeType)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {RANGE_TYPES.map((rangeType) => (
                        <SelectItem key={rangeType} value={rangeType}>
                            By {rangeType}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {rangeType === "year" && (
                <YearPicker
                    min={min}
                    max={max}
                    onChange={(year) => {
                        const dt = setYear(new Date(), year);
                        onChange?.({
                            min: startOfYear(dt),
                            max: endOfYear(dt),
                        });
                    }}
                    value={getYear(value.min)}
                />
            )}
            {rangeType === "month" && (
                <MonthPicker
                    min={min}
                    max={max}
                    onChange={onChange}
                    value={value}
                />
            )}
        </>
    );
}
