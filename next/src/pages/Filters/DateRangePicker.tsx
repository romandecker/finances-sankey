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
            <SelectTrigger className="w-[180px]">
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

    console.log("value", value);

    return (
        <>
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
            <Select
                value={startOfMonth(value.min).toISOString()}
                onValueChange={(value) =>
                    onChange?.({
                        min: startOfMonth(value),
                        max: endOfMonth(value),
                    })
                }
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {months.map((month) => (
                        <SelectItem
                            key={month.toISOString()}
                            value={month.toISOString()}
                        >
                            {format(month, "MMM y")}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
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
