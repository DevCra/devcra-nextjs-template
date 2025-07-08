"use client";

import { useState } from "react";
import Tab from "./Tab";

export default function TabExample() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = ["탭 1", "탭 2", "탭 3"];

  const renderTabContent = (index: number) => {
    switch (index) {
      case 0:
        return <p>탭 1의 콘텐츠입니다.</p>;
      case 1:
        return <p>탭 2의 콘텐츠입니다.</p>;
      case 2:
        return <p>탭 3의 콘텐츠입니다.</p>;
      default:
        return <p>알 수 없는 탭입니다.</p>;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Tab 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            현재 Tab 컴포넌트는 다음과 같은 기능을 제공합니다:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 탭 헤더 클릭 시 콘텐츠 변경</li>
            <li>• 동적 콘텐츠 렌더링 지원</li>
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
import Tab from "@/ui/tab/Tab";

const [activeIndex, setActiveIndex] = useState(0);

<Tab
  tabs={["탭 1", "탭 2", "탭 3"]}
  index={activeIndex}
  setIndex={setActiveIndex}
  renderContent={(index) => <p>{\`탭 \${index + 1}의 콘텐츠\`}</p>}
/>`}
          </pre>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">실제 예제</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <Tab
            tabs={tabs}
            index={activeIndex}
            setIndex={setActiveIndex}
            renderContent={renderTabContent}
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Props 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-900">tabs</h3>
              <p className="text-sm text-gray-600">
                탭 이름 배열을 전달합니다.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">index</h3>
              <p className="text-sm text-gray-600">
                현재 활성화된 탭의 인덱스를 전달합니다.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">setIndex</h3>
              <p className="text-sm text-gray-600">
                탭 변경 시 호출되는 상태 업데이트 함수입니다.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">renderContent</h3>
              <p className="text-sm text-gray-600">
                탭에 따라 렌더링할 콘텐츠를 반환하는 함수입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
