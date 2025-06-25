"use client";

import { useState } from "react";
import { type ColumnDef, type SortingState } from "@tanstack/react-table";
import Table from "./Table";

// 예제 데이터 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

// 예제 데이터
const sampleData: User[] = [
  {
    id: 1,
    name: "김철수",
    email: "kim@example.com",
    role: "관리자",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "이영희",
    email: "lee@example.com",
    role: "사용자",
    status: "active",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "박민수",
    email: "park@example.com",
    role: "사용자",
    status: "inactive",
    createdAt: "2024-01-25",
  },
  {
    id: 4,
    name: "정수진",
    email: "jung@example.com",
    role: "관리자",
    status: "active",
    createdAt: "2024-02-01",
  },
];

export default function TableExample() {
  const [sorting, setSorting] = useState<SortingState>([]);

  // 컬럼 정의
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 10,
    },
    {
      accessorKey: "name",
      header: "이름",
      size: 20,
    },
    {
      accessorKey: "email",
      header: "이메일",
      size: 30,
    },
    {
      accessorKey: "role",
      header: "역할",
      size: 15,
    },
    {
      accessorKey: "status",
      header: "상태",
      size: 15,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
              status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status === "active" ? "활성" : "비활성"}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "생성일",
      size: 10,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Table 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            현재 Table 컴포넌트는 다음과 같은 기능을 제공합니다:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• TanStack Table 기반의 고성능 테이블</li>
            <li>• 컬럼별 정렬 기능 (오름차순/내림차순)</li>
            <li>• 반응형 디자인과 커스터마이징 가능한 스타일</li>
            <li>• 컬럼 크기 조절 및 레이아웃 제어</li>
            <li>• 데이터가 없을 때의 빈 상태 표시</li>
            <li>• TypeScript 완전 지원</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">기본 사용법</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <pre className="text-sm text-blue-800 overflow-x-auto">
            {`// 기본 사용법
import { type ColumnDef } from "@tanstack/react-table";
import Table from "@/ui/table/Table";

// 컬럼 정의
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "이름",
    size: 20,
  },
  // ... 더 많은 컬럼
];

// 데이터와 함께 사용
<Table 
  data={users} 
  columns={columns}
  sorting={sorting}
  setSorting={setSorting}
/>`}
          </pre>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">실제 예제</h2>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <Table
            data={sampleData}
            columns={columns}
            sorting={sorting}
            setSorting={setSorting}
            stylesOptions={{
              tableClassName: "min-h-[400px]",
            }}
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Props 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-900">data</h3>
              <p className="text-sm text-gray-600">
                테이블에 표시할 데이터 배열
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">columns</h3>
              <p className="text-sm text-gray-600">
                TanStack Table의 ColumnDef 배열
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">sorting</h3>
              <p className="text-sm text-gray-600">현재 정렬 상태 (선택사항)</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">setSorting</h3>
              <p className="text-sm text-gray-600">
                정렬 상태 변경 함수 (선택사항)
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">stylesOptions</h3>
              <p className="text-sm text-gray-600">
                테이블, thead, tbody의 커스텀 클래스명 (선택사항)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
