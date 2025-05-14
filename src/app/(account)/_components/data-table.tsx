"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Selection,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Columns,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { ReactNode, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableToolbar } from "../admin/_components/data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableBody?: ReactNode;
  titleModal?: string;
  length: number;
  placeholder: string;
  buttonNew?: boolean;
  titleFound: string;
  filterableColumns: string[];
  facetedFilter?: boolean;
  filter1?: string;
  name_btn?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tableBody,
  titleModal,
  length,
  placeholder,
  buttonNew,
  titleFound,
  filterableColumns,
  facetedFilter,
  filter1,
  name_btn,
}: DataTableProps<TData, TValue>) {
  // console.log(columns);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set("all"),
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const customGlobalFilter =
    (filterableColumns: string[]) =>
    <TData,>(
      row: Row<TData>,
      _columnId: string, // obrigatoriamente presente mas não usado!
      filterValue: string,
    ) =>
      filterableColumns.some((columnId) => {
        console.log(_columnId);

        const value = row.getValue(columnId); // columnId é string!
        return String(value ?? "")
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      rowSelection,
      pagination,
      columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: customGlobalFilter(filterableColumns),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Input
            radius="lg"
            placeholder={placeholder}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
            classNames={{
              inputWrapper: "dark:bg-white bg-sky-200 hover:bg-sky-300",
              input: "dark:text-black text-black hover:bg-sky-300",
            }}
            startContent={
              <SearchIcon
                className="text-black/50 dark:text-black/90"
                size={20}
              />
            }
          />
          {facetedFilter && (
            <DataTableToolbar
              table={table}
              name_btn={name_btn}
              filter1={filter1}
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <Dropdown>
            <DropdownTrigger className="sm:flex">
              <Button
                size="sm"
                variant="shadow"
                color="default"
                className="ml-auto dark:bg-blue-800"
                endContent={
                  <ChevronDown className="ml-2 hidden h-4 w-4 sm:block" />
                }
              >
                <span className="hidden sm:inline">Colunas</span>
                <Columns className="block h-4 w-4 sm:hidden" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownItem
                    key={column.id}
                    className="capitalize"
                    onPress={() => {
                      column.toggleVisibility(!column.getIsVisible());
                    }}
                  >
                    {column.columnDef.header?.toString()}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </Dropdown>
          {buttonNew && (
            <Tooltip content="Novo" placement="bottom" color="foreground">
              <Button
                size="sm"
                variant="shadow"
                className="ml-auto"
                color="primary"
                onPress={onOpen}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </Tooltip>
          )}

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            size="3xl"
          >
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                {titleModal}
              </ModalHeader>
              <ModalBody>{tableBody}</ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </div>

      <div className="rounded-md border">
        <Table className="border-2 border-blue-400">
          <TableHeader className="bg-slate-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center text-white ${
                            header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : ""
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span className="mr-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </span>
                          <span>
                            {{
                              asc: <ArrowUp size={18} />,
                              desc: <ArrowDown size={18} />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </span>
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="dark:text-black"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center dark:text-black"
                >
                  Sem resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="text-muted-foreground flex-1 text-sm">
          {titleFound} encontrados: {length}
        </div>
        <div className="space-x-2">
          <Button
            variant="solid"
            size="sm"
            onPress={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            Voltar
          </Button>
          <Button
            variant="solid"
            size="sm"
            onPress={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            Proximo
          </Button>
        </div>
      </div>
    </>
  );
}
