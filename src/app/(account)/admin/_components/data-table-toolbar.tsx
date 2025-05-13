"use client";

import { Table } from "@tanstack/react-table";

import { PAYMENT_STATUS_OPTIONS } from "../_constants/payment";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table?: Table<TData>;
  name_btn?: string;
  filter1?: string;
}

export function DataTableToolbar<TData>({
  table,
  filter1,
  name_btn,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {table && filter1 && (
          <DataTableFacetedFilter
            column={table.getColumn(filter1)}
            title={name_btn}
            options={PAYMENT_STATUS_OPTIONS}
          />
        )}
      </div>
    </div>
  );
}
