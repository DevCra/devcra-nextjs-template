import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  Header,
} from "@tanstack/react-table";

const columns: ColumnDef<Data>[] = [
  {
    header: "Category Info",
    columns: [
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "subCategory",
        header: "Sub-Category",
      },
    ],
  },
  {
    accessorKey: "type",
    header: "Type", // 여기 leaf 헤더
    meta: {
      rowSpan: 2, // 2행을 병합
    },
  },
];
type Data =
  | { kind: "normal"; category: string; subCategory: string; type: string }
  | { kind: "mergeLeft"; label: string; type: string } // 왼쪽 두 칸 합침
  | { kind: "mergeRight"; category: string; label: string }; // 오른쪽 두 칸 합침

const data: Data[] = [
  { kind: "normal", category: "c1", subCategory: "sc1", type: "t1" },
  { kind: "normal", category: "c2", subCategory: "sc2", type: "t2" },
  { kind: "mergeLeft", label: "csc", type: "t3" }, // 왼쪽 2칸 합쳐짐
  { kind: "mergeRight", category: "c3", label: "sct" }, // 오른쪽 2칸 합쳐짐
  { kind: "normal", category: "c4", subCategory: "sc3", type: "t3" },
];

const columns2: ColumnDef<Data2>[] = [
  {
    header: "Category Info",
    columns: [
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "subCategory",
        header: "Sub-Category",
      },
    ],
  },
  {
    accessorKey: "type",
    header: "Type", // 여기 leaf 헤더
    meta: {
      rowSpan: 2, // 2행을 병합
    },
  },
];
type Data2 =
  | { type: "normal"; category: string; subCategory: string; typeValue: string }
  | { type: "merged"; label: string };

const data2: Data2[] = [
  { type: "normal", category: "c1", subCategory: "sc1", typeValue: "t1" },
  { type: "normal", category: "c2", subCategory: "sc2", typeValue: "t2" },
  { type: "merged", label: "csct" },
  { type: "merged", label: "csct2" },
  { type: "normal", category: "c3", subCategory: "sc3", typeValue: "t3" },
];
const columns3: ColumnDef<Data3>[] = [
  {
    header: "Category Info",
    columns: [
      {
        accessorKey: "category",
        header: "Category",
        meta: {
          rowSpan: 2, // 2행을 병합
        },
      },
      {
        header: "Sub-Categories",
        columns: [
          {
            accessorKey: "weight",
            header: "Weight",
          },
          {
            accessorKey: "status",
            header: "Status",
          },
        ],
      },
    ],
  },
  {
    accessorKey: "type",
    header: "Type", // 여기 leaf 헤더
    meta: {
      rowSpan: 3, // 2행을 병합
    },
  },
];
type Data3 =
  | {
      type: "normal";
      category: string;
      status: string;
      weight: string;
      typeValue: string;
    }
  | { type: "merged"; label: string; typeValue: string };

const data3: Data3[] = [
  {
    type: "normal",
    category: "c1",
    status: "sc1",
    weight: "10",
    typeValue: "t1",
  },
  {
    type: "normal",
    category: "c2",
    status: "sc2",
    weight: "3",
    typeValue: "t2",
  },
  { type: "merged", label: "csct", typeValue: "t2" },
  { type: "merged", label: "csct2", typeValue: "t2" },
  {
    type: "normal",
    category: "c3",
    status: "sc3",
    weight: "5",
    typeValue: "t3",
  },
];

/**
 * https://www.npmjs.com/package/tanstack-table-header-rowspan?activeTab=readme
 * 가장 깊은 헤더를 찾는 함수
 * @param header 현재 헤더
 * @returns 가장 깊은 헤더 또는 null
 */
function deepestHeader<D, V>(header: Header<D, V>): Header<D, V> | null {
  let last = header;
  while (true) {
    const next =
      last.isPlaceholder && last.colSpan === 1 && last.subHeaders.length === 1
        ? last.subHeaders[0]
        : null;
    if (next) {
      last = next;
    } else {
      return last === header ? null : last;
    }
  }
}

/**
 * https://www.npmjs.com/package/tanstack-table-header-rowspan?activeTab=readme
 * 헤더의 rowSpan 값을 계산하는 함수
 * @param header 현재 헤더
 * @returns rowSpan 값 또는 null
 */
function tableHeaderRowSpan(header: Header<any, any>): number | null {
  const deepest = deepestHeader(header); // 가장 깊은 헤더 찾기

  const rowSpan = (deepest ? deepest.depth - header.depth : 0) + 1; // rowSpan 계산
  const above = header.depth - header.column.depth; // 현재 헤더와 컬럼의 depth 차이 계산

  // depth 차이가 1보다 크면 rowSpan을 null로 설정
  if (above > 1) {
    return null;
  }

  return rowSpan; // 계산된 rowSpan 반환
}

export default function TableComponentExample() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const table2 = useReactTable({
    data: data2,
    columns: columns2,
    getCoreRowModel: getCoreRowModel(),
  });
  const table3 = useReactTable({
    data: data3,
    columns: columns3,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const rowSpan = header.column.columnDef.meta?.rowSpan;

                if (
                  !header.isPlaceholder && // 조건 1 : columns 있을때 or columns 없을때 마지막 depth (ex > depth 2의 type)
                  rowSpan !== undefined && // 조건 2 : rowSpan 존재 (ex > type)
                  header.id === header.column.id // 조건 3 : 마지막 depth 일때 (ex > category, sub-category, type)
                ) {
                  return null;
                }

                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    rowSpan={rowSpan}
                    className="border border-gray-400 bg-gray-100 px-2 py-1 text-center align-middle"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.map((row, i) => {
            if (row.kind === "normal") {
              return (
                <tr key={i}>
                  <td className="border px-3 py-2">{row.category}</td>
                  <td className="border px-3 py-2">{row.subCategory}</td>
                  <td className="border px-3 py-2">{row.type}</td>
                </tr>
              );
            }
            if (row.kind === "mergeLeft") {
              return (
                <tr key={i}>
                  <td colSpan={2} className="border px-3 py-2 text-center">
                    {row.label}
                  </td>
                  <td className="border px-3 py-2">{row.type}</td>
                </tr>
              );
            }
            if (row.kind === "mergeRight") {
              return (
                <tr key={i}>
                  <td className="border px-3 py-2">{row.category}</td>
                  <td colSpan={2} className="border px-3 py-2 text-center">
                    {row.label}
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>

      <br />
      <br />
      {/* <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table2.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const rowSpan = header.column.columnDef.meta?.rowSpan;

                if (
                  !header.isPlaceholder && // 조건 1 : columns 있을때 or columns 없을때 마지막 depth (ex > depth 2의 type)
                  rowSpan !== undefined && // 조건 2 : rowSpan 존재 (ex > type)
                  header.id === header.column.id // 조건 3 : 마지막 depth 일때 (ex > category, sub-category, type)
                ) {
                  return null;
                }

                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    rowSpan={rowSpan}
                    className="border border-gray-400 bg-gray-100 px-2 py-1 text-center align-middle"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table2.getRowModel().rows.map((row) => {
            const original = row.original;

            // ✅ merged row 처리
            if (original.type === "merged") {
              return (
                <tr key={row.id}>
                  <td
                    colSpan={3}
                    className="border border-gray-400 bg-gray-50 px-2 py-2 text-center font-semibold"
                  >
                    {original.label}
                  </td>
                </tr>
              );
            }

            // ✅ normal row 처리
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-400 px-2 py-1"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table> */}
      <br />
      <br />
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table3.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // notice the function name we pick here
                const rowSpan = tableHeaderRowSpan(header);
                if (!rowSpan) {
                  // it's necessary to skip redundant cells
                  return null;
                }
                return (
                  <th
                    key={header.id}
                    className={"border border-black/20 bg-gray-100 px-2"}
                    colSpan={header.colSpan}
                    rowSpan={rowSpan}
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table3.getRowModel().rows.map((row) => {
            const original = row.original;

            // ✅ merged row 처리
            if (original.type === "merged") {
              return (
                <tr key={row.id}>
                  <td
                    colSpan={3}
                    className="border border-gray-400 bg-gray-50 px-2 py-2 text-center font-semibold"
                  >
                    {original.label}
                  </td>
                  <td className="border border-gray-400 bg-gray-50 px-2 py-2 text-center font-semibold">
                    {original.typeValue}
                  </td>
                </tr>
              );
            }

            // ✅ normal row 처리
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-400 px-2 py-1"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
