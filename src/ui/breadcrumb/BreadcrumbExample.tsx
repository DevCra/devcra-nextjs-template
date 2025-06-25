"use client";

import Breadcrumb from "./Breadcrumb";

export default function BreadcrumbExample() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Breadcrumb 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            현재 Breadcrumb 컴포넌트는 다음과 같은 기능을 제공합니다:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 현재 경로를 자동으로 파싱하여 브레드크럼 생성</li>
            <li>
              • 경로 세그먼트를 자동으로 라벨로 변환 (kebab-case → Title Case)
            </li>
            <li>• 각 경로 세그먼트에 대한 링크 제공</li>
            <li>• 현재 페이지는 비활성화된 링크로 표시</li>
            <li>• ChevronUpIcon을 구분자로 사용</li>
            <li>• TypeScript 완전 지원</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">기본 사용법</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <pre className="text-sm text-blue-800 overflow-x-auto">
            {`// 기본 사용법
import Breadcrumb from "@/ui/breadcrumb/Breadcrumb";

// 현재 경로에 따라 자동으로 브레드크럼 생성
<Breadcrumb />

// 현재 경로: /ui/breadcrumb
// 결과: UI > Breadcrumb`}
          </pre>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">실제 예제</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="mb-2 text-sm text-gray-600">
            현재 경로: /ui/breadcrumb
          </div>
          <Breadcrumb />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">다른 경로 예제</h2>
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="mb-2 text-sm text-gray-600">경로: /ui/table</div>
            <div className="flex items-center gap-1 text-sm">
              <a href="/ui" className="text-blue-600 hover:text-blue-800">
                UI
              </a>
              <span className="text-gray-400">›</span>
              <span className="text-gray-500">Table</span>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="mb-2 text-sm text-gray-600">경로: /ui/gnb</div>
            <div className="flex items-center gap-1 text-sm">
              <a href="/ui" className="text-blue-600 hover:text-blue-800">
                UI
              </a>
              <span className="text-gray-400">›</span>
              <span className="text-gray-500">Gnb</span>
            </div>
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
                Breadcrumb 컴포넌트는 props를 받지 않으며, 현재 경로를 자동으로
                파싱하여 브레드크럼을 생성합니다.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">자동 기능</h3>
              <p className="text-sm text-gray-600">
                • 경로 세그먼트를 자동으로 읽어서 브레드크럼 생성
                <br />
                • kebab-case를 Title Case로 변환 (예: ui-breadcrumb → UI
                Breadcrumb)
                <br />
                • 각 세그먼트에 대한 링크 자동 생성
                <br />• 현재 페이지는 비활성화된 텍스트로 표시
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
