import {
  Button,
  Checkbox,
  CheckboxGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { Column } from "@tanstack/react-table";
import * as React from "react";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const selectedValues = new Set((column?.getFilterValue() as string[]) ?? []);

  const handleStatusChange = (values: string[]) => {
    column?.setFilterValue(values);
  };

  return (
    <Popover showArrow offset={10} placement="bottom">
      <PopoverTrigger>
        <Button size="sm" color="primary">
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        <div className="w-full px-1 py-2">
          <div className="mt-2 flex w-full flex-col gap-2">
            <CheckboxGroup
              defaultValue={Array.from(selectedValues)}
              onValueChange={handleStatusChange}
            >
              {options.map((status) => (
                <div key={status.value} className="flex items-center space-x-2">
                  <Checkbox
                    classNames={{
                      label:
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    }}
                    value={status.value}
                  >
                    {status.label}
                  </Checkbox>
                </div>
              ))}
            </CheckboxGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
