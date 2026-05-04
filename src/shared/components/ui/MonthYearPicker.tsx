"use client";

import {
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export interface MonthYearDates {
  month: number;
  year: number;
}

interface MonthYearPickerProps {
  value: MonthYearDates;
  onChange: (date: MonthYearDates) => void;
  label?: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function MonthYearPicker({
  value,
  onChange,
  label,
}: Readonly<MonthYearPickerProps>) {
  const [viewYear, setViewYear] = useState(value.year);

  const handleMonthSelect = (monthIndex: number) => {
    onChange({
      month: monthIndex + 1,
      year: viewYear,
    });
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      {label && (
        <Label className="text-muted text-xs uppercase tracking-widest">
          {label}
        </Label>
      )}
      <Popover>
        <PopoverTrigger>
          <Button
            variant="ghost"
            className="justify-between font-serif text-foreground bg-surface/75 border border-border"
          >
            {`${MONTHS[value.month - 1]} ${value.year}`}
            <ChevronDown size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          placement="bottom start"
          className="bg-background border border-border p-4 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-6 px-2">
            <Button
              isIconOnly
              size="sm"
              variant="secondary"
              onClick={() => setViewYear((prev) => prev - 1)}
            >
              <ChevronLeft size={18} className="text-foreground" />
            </Button>
            <span className="text-lg font-serif font-bold">{viewYear}</span>
            <Button
              isIconOnly
              size="sm"
              variant="secondary"
              onClick={() => setViewYear((prev) => prev + 1)}
            >
              <ChevronRight size={18} className="text-foreground" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((month, index) => {
              const isSelected =
                value.month === index + 1 && value.year === viewYear;

              return (
                <Button
                  key={month}
                  size="sm"
                  variant={isSelected ? "primary" : "ghost"}
                  className={` ${
                    isSelected
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:text-foreground"
                  }`}
                  onClick={() => handleMonthSelect(index)}
                >
                  {month.substring(0, 3)}
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
