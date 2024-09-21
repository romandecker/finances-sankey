"use client";

import { endOfYear, getYear, setYear, startOfYear } from "date-fns";
import * as React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
import { DateRange } from "../../../utils/ingest/TransactionRegistry";
import { MonthPicker } from "./MonthPicker";
import { YearPicker } from "./YearPicker";
import { CustomRangePicker } from "./CustomRangePicker";

export interface DateRangePickerProps extends DateRange {
    onChange?: (range: DateRange) => void;
    value: DateRange;
}

const RANGE_TYPES = ["year", "month", "custom"] as const;
type RangeType = (typeof RANGE_TYPES)[number];

export function DateRangePicker({
    min,
    max,
    onChange,
    value,
}: DateRangePickerProps) {
    const [rangeType, setRangeType] = React.useState<RangeType>("year");
    return (
        <div className="flex flex-col gap-1">
            <Select
                value={rangeType}
                onValueChange={(val) => setRangeType(val as RangeType)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={"year"}>By year</SelectItem>
                    <SelectItem value={"month"}>By month</SelectItem>
                    <SelectItem value={"custom"}>Custom</SelectItem>
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
            {rangeType === "custom" && (
                <CustomRangePicker
                    min={min}
                    max={max}
                    onChange={onChange}
                    value={value}
                />
            )}
        </div>
    );
}
