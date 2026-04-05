"use client";

import * as React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      classNames={{
        button_next: cn(
          buttonVariants({ size: "icon", variant: "ghost" }),
          "absolute top-1 right-1 size-8 rounded-full bg-transparent text-[#5d696d] shadow-none hover:bg-[#eef4ef]",
        ),
        button_previous: cn(
          buttonVariants({ size: "icon", variant: "ghost" }),
          "absolute top-1 left-1 size-8 rounded-full bg-transparent text-[#5d696d] shadow-none hover:bg-[#eef4ef]",
        ),
        caption_label:
          "text-sm font-semibold tracking-[-0.02em] text-[#243238]",
        day: "text-center text-sm",
        day_button:
          "flex size-9 items-center justify-center rounded-full font-medium text-[#243238] transition-colors hover:bg-[#eef4ef]",
        dropdown:
          "h-9 cursor-pointer appearance-none rounded-lg border border-[#d7e3dc] bg-white px-3 pr-8 text-sm font-medium text-[#243238] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition-colors focus-visible:border-[#2b74d8]/35 focus-visible:ring-2 focus-visible:ring-[#2b74d8]/12",
        dropdown_root: "relative",
        dropdowns: "flex items-center justify-center gap-2",
        disabled: "text-[#bcc4c1] opacity-60",
        hidden: "invisible",
        month: "space-y-4",
        month_caption:
          "relative flex min-h-9 items-center justify-center px-10 text-center",
        month_grid: "w-full border-collapse",
        months: "flex flex-col",
        outside: "text-[#bcc4c1]",
        selected:
          "bg-[#0b625d]! text-white! hover:bg-[#0b625d]! hover:text-white!",
        today: "bg-[#eef4ef] text-[#0b625d]",
        week: "mt-2 flex w-full",
        weekday:
          "w-9 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-[#8a9491]",
        weekdays: "flex",
        ...classNames,
      }}
      components={{
        Chevron: ({
          className: chevronClassName,
          orientation,
          ...chevronProps
        }) =>
          orientation === "left" ? (
            <ChevronLeft
              className={cn("size-4", chevronClassName)}
              {...chevronProps}
            />
          ) : (
            <ChevronRight
              className={cn("size-4", chevronClassName)}
              {...chevronProps}
            />
          ),
      }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
}

export { Calendar };
