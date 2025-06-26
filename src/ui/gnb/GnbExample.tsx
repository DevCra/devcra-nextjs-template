"use client";

import Gnb from "./Gnb";
import GnbSimple from "./GnbSimple";

export default function GnbExample() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Gnb 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            현재 Gnb 컴포넌트는 다음과 같은 기능을 제공합니다:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 계층적 메뉴 구조 지원 (부모-자식 메뉴)</li>
            <li>• 접기/펼치기 기능</li>
            <li>• 현재 페이지 하이라이트</li>
            <li>• 권한 기반 메뉴 필터링</li>
            <li>• 반응형 사이드바 (축소/확장)</li>
            <li>• 부드러운 애니메이션 효과</li>
            <li>• TypeScript 완전 지원</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">기본 사용법</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <pre className="text-sm text-blue-800 overflow-x-auto">
            {`// 기본 사용법
import Gnb from "@/ui/gnb/Gnb";

// 레이아웃에서 사용
<div className="flex h-screen">
  <Gnb />
  <main className="flex-1">
    {/* 메인 콘텐츠 */}
  </main>
</div>

// 메뉴 구성은 Gnb.tsx 파일에서 설정
const getGnbItems = (): GnbItem[] => [
  {
    name: "UI Components",
    href: "/ui",
    children: [
      {
        name: "Breadcrumb",
        href: "/ui/breadcrumb",
        key: GNB_KEY.ui_breadcrumb,
      },
      // ... 더 많은 메뉴
    ],
  },
];`}
          </pre>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">실제 예제</h2>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex h-[500px]">
            <Gnb />
            <main className="flex-1 p-6 bg-gray-50">
              <div className="text-center text-gray-500">
                <p>메인 콘텐츠 영역</p>
                <p className="text-sm mt-2">왼쪽 GNB에서 메뉴를 선택해보세요</p>
              </div>
            </main>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">실제 예제2</h2>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex h-[500px]">
            <GnbSimple />
            <main className="flex-1 p-6 bg-gray-50">
              <div className="text-center text-gray-500">
                <p>수정사항</p>
                <p className="text-sm mt-2">
                  1. parent 클릭 시, open/close만 진행
                </p>
                <p className="text-sm mt-2">2. 첫번째 메뉴 오픈 상태</p>
              </div>
            </main>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">메뉴 구조</h4>
            <p className="text-sm text-blue-700">
              계층적 메뉴 구조를 지원하여 부모 메뉴와 자식 메뉴를 구분하여
              표시합니다.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">권한 관리</h4>
            <p className="text-sm text-green-700">
              사용자 권한에 따라 메뉴 항목을 필터링하여 표시합니다.
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">상태 관리</h4>
            <p className="text-sm text-purple-700">
              현재 열린 메뉴 상태를 관리하고 페이지 이동 시 자동으로 해당 메뉴를
              펼칩니다.
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-medium text-orange-800 mb-2">반응형 디자인</h4>
            <p className="text-sm text-orange-700">
              사이드바를 축소/확장할 수 있어 공간을 효율적으로 활용할 수
              있습니다.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Props 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-900">Props 없음</h3>
              <p className="text-sm text-gray-600">
                Gnb 컴포넌트는 props를 받지 않으며, 내부적으로 메뉴 구조와
                권한을 관리합니다.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">설정 방법</h3>
              <p className="text-sm text-gray-600">
                •{" "}
                <code className="bg-gray-200 px-1 rounded">getGnbItems()</code>:
                메뉴 구조 정의
                <br />•{" "}
                <code className="bg-gray-200 px-1 rounded">
                  userPermissionItems
                </code>
                : 권한 설정
                <br />•{" "}
                <code className="bg-gray-200 px-1 rounded">GNB_KEY</code>: 메뉴
                키 상수 정의
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">자동 기능</h3>
              <p className="text-sm text-gray-600">
                • 현재 페이지에 따른 메뉴 자동 펼침
                <br />
                • 권한 기반 메뉴 자동 필터링
                <br />
                • 페이지 이동 시 상태 자동 업데이트
                <br />• 반응형 사이드바 상태 관리
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
