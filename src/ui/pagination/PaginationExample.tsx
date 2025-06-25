"use client";

import { useState } from "react";
import PaginationComponent from "./Pagination";

// 예제 데이터 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// 예제 데이터 (100개 항목)
const generateSampleData = (): User[] => {
  return Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `사용자 ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index % 3 === 0 ? "관리자" : "사용자",
  }));
};

export default function PaginationExample() {
  const [pagination, setPagination] = useState({
    page: 1,
    itemsPerPage: 10,
  });

  const sampleData = generateSampleData();
  const totalCount = sampleData.length;
  const totalPage = Math.ceil(totalCount / pagination.itemsPerPage);

  // 현재 페이지의 데이터만 표시
  const currentPageData = sampleData.slice(
    (pagination.page - 1) * pagination.itemsPerPage,
    pagination.page * pagination.itemsPerPage,
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Pagination 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            현재 Pagination 컴포넌트는 다음과 같은 기능을 제공합니다:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 첫 페이지/마지막 페이지로 이동 버튼</li>
            <li>• 이전/다음 페이지 이동 버튼</li>
            <li>• 현재 페이지 범위 표시 (예: 1-10 of 100)</li>
            <li>• 페이지 경계에서 버튼 자동 비활성화</li>
            <li>• 직관적인 아이콘 기반 네비게이션</li>
            <li>• TypeScript 완전 지원</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">기본 사용법</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <pre className="text-sm text-blue-800 overflow-x-auto">
            {`// 기본 사용법
import { useState } from "react";
import PaginationComponent from "@/ui/pagination/Pagination";

// 상태 관리
const [pagination, setPagination] = useState({
  page: 1,
  itemsPerPage: 10,
});

// 컴포넌트 사용
<PaginationComponent
  pagination={pagination}
  setPagination={setPagination}
  totalPage={totalPage}
  totalCount={totalCount}
/>`}
          </pre>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">실제 예제</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">사용자 목록</h3>
            <div className="text-sm text-gray-600 mb-4">
              총 {totalCount}명의 사용자 중 {pagination.page}페이지 표시
            </div>
          </div>

          {/* 데이터 테이블 */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이름
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이메일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    역할
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPageData.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center">
            <PaginationComponent
              pagination={pagination}
              setPagination={setPagination}
              totalPage={totalPage}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">다양한 설정 예제</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-2">페이지당 5개 항목</h3>
            <div className="text-sm text-gray-600 mb-4">
              총 100개 항목, 20페이지
            </div>
            <div className="flex justify-center">
              <PaginationComponent
                pagination={{ page: 1, itemsPerPage: 5 }}
                setPagination={() => {}}
                totalPage={20}
                totalCount={100}
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-2">페이지당 20개 항목</h3>
            <div className="text-sm text-gray-600 mb-4">
              총 100개 항목, 5페이지
            </div>
            <div className="flex justify-center">
              <PaginationComponent
                pagination={{ page: 3, itemsPerPage: 20 }}
                setPagination={() => {}}
                totalPage={5}
                totalCount={100}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Props 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-900">pagination</h3>
              <p className="text-sm text-gray-600">
                현재 페이지 정보를 담은 객체
              </p>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                <li>
                  • <code className="bg-gray-200 px-1 rounded">page</code>: 현재
                  페이지 번호
                </li>
                <li>
                  •{" "}
                  <code className="bg-gray-200 px-1 rounded">itemsPerPage</code>
                  : 페이지당 항목 수
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">setPagination</h3>
              <p className="text-sm text-gray-600">
                페이지네이션 상태를 업데이트하는 함수
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">totalPage</h3>
              <p className="text-sm text-gray-600">전체 페이지 수</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">totalCount</h3>
              <p className="text-sm text-gray-600">전체 항목 수</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
