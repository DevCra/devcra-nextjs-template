import { ChevronUpIcon } from "@heroicons/react/16/solid";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface TableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  stylesOptions?: {
    tableClassName?: string;
    theadClassName?: string;
    tbodyClassName?: string;
  };
}

const Table = <T extends object>({
  data,
  columns,
  sorting,
  setSorting,
  stylesOptions,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    enableSortingRemoval: false,
  });

  return (
    <>
      <table
        className={clsx(
          "relative min-w-full divide-y divide-gray-300",
          stylesOptions?.tableClassName,
        )}
      >
        <thead
          className={clsx(
            "sticky top-0 flex w-full bg-white",
            stylesOptions?.theadClassName,
          )}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="flex w-full">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className={clsx(
                    "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                    header.column.getIsLastColumn() && "flex justify-end",
                    header.column.getCanSort() && "cursor-pointer select-none",
                  )}
                  style={{
                    width: `${header.column.getSize()}%`,
                  }}
                >
                  <div
                    onClick={header.column.getToggleSortingHandler()}
                    className="flex w-fit items-center gap-1"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {{
                      asc: <ChevronUpIcon className="h-4 w-4" />,
                      desc: <ChevronUpIcon className="h-4 w-4 rotate-180" />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          className={clsx(
            "flex w-full flex-col divide-y divide-gray-200 overflow-auto bg-white",
            stylesOptions?.tbodyClassName,
          )}
        >
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="flex">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={clsx(
                      "px-3 py-4 text-sm text-gray-500",
                      cell.column.getIsLastColumn() && "flex justify-end",
                    )}
                    style={{
                      width: `${cell.column.getSize()}%`,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {data.length < 1 && (
        <div className="flex justify-center py-3 text-black/60">
          No available data
        </div>
      )}
    </>
  );
};

export default Table;
