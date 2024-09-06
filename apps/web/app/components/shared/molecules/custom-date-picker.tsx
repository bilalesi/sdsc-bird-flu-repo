"use client";

import { subDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";

import { cn } from "@sdsc/lib/clsx";
import { Button } from "@sdsc/ui/button";
import { Calendar } from "@sdsc/ui/calendar";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@sdsc/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@sdsc/ui/popover";
import useQuery from "@/app/components/shared/hooks/use-query-params";

export default function CustomDateRangePicker({
  className,
  position = "end",
  showPresets = true,
  numberOfMonths = 2,
}: React.HTMLAttributes<HTMLDivElement> & {
  numberOfMonths?: number;
  showPresets?: boolean;
  position?: "center" | "end" | "start" | undefined;
}) {
  const {
    query: { gte, lte },
    updateQuery,
  } = useQuery();

  const onSelect = (value: DateRange | undefined) => {
    updateQuery({
      gte: value?.from ?? null,
      lte: value?.to ?? null,
    });
  };

  return (
    <div className={cn("grid gap-2 w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !gte && !lte && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {gte ? (
              lte ? (
                <>
                  {format(gte, "LLL dd, y")} - {format(lte, "LLL dd, y")}
                </>
              ) : (
                format(gte, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0 w-full" align={position}>
          {showPresets && (
            <div className="w-full py-2 px-4 flex justify-end">
              <Select
                onValueChange={(value) =>
                  onSelect(
                    value === "clear"
                      ? { from: undefined, to: undefined }
                      : {
                          from: subDays(new Date(), parseInt(value)),
                          to: new Date(),
                        },
                  )
                }
              >
                <SelectTrigger className="self-end  min-w-48 max-w-max">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" side="left">
                  <SelectItem value="clear">Clear</SelectItem>
                  <SelectItem value="30">Last Month</SelectItem>
                  <SelectItem value="90">Last 3 Month</SelectItem>
                  <SelectItem value="365">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={gte ?? undefined}
            selected={{ from: gte ?? undefined, to: lte ?? undefined }}
            onSelect={onSelect}
            numberOfMonths={numberOfMonths}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
