import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  Header,
} from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    rowSpan?: number; // rowSpan 속성 추가
  }
}

/**
 * headerGroup.headers.map((header)
 * id
 * - header.id
 * - 일반적으로 ColumnDef 의 header 값
 * - depth 1일때는 1_이름 으로 붙음
 * - ColumnDef 의 마지막 depth 일때 이름 으로 붙음
 * - ColumnDef 의 columns 가 있으면 마지막 depth 아닐때  depth값_이름(1_이름) 으로 붙음
 * - ColumnDef 의 columns 없으면 마지막 depth 아닐때 depth값_이름_이름(1_이름_이름) 으로 붙음
 * - column id 와 다른 값일 수 있음
 * isPlaceholder
 * - header.isPlaceholder
 * - 제일 마지막 depth 일때 false
 * - colSpan 이 2 이상일 때, 그 위 depth 들은 true
 * rowSpan
 * - header.column.columnDef.meta?.rowSpan
 * column id
 * - header.column.id
 * - ColumnDef 의 header 값
 * depth
 * - header.depth
 * - 1부터 시작
 */

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

export default function TableComponent<T>({
  columns,
  data,
}: {
  columns: ColumnDef<T>[];
  data: T[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
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
          {table.getRowModel().rows.map((row) => {
            // const original = row.original;

            // // ✅ merged row 처리
            // if (original.type === "merged") {
            //   return (
            //     <tr key={row.id}>
            //       <td
            //         colSpan={original.colSpan || 1}
            //         className="border border-gray-400 bg-gray-50 px-2 py-2 text-center font-semibold"
            //       >
            //         {original.value || "-"}
            //       </td>
            //     </tr>
            //   );
            // }

            // // ✅ normal row 처리
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
