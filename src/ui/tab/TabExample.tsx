"use client";

import { useState } from "react";
import Tab from "./Tab";

export default function TabExample() {
  const [activeIndexAnimated, setActiveIndexAnimated] = useState(0);
  const [activeIndexNonAnimated, setActiveIndexNonAnimated] = useState(0);

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
      {/* 설명 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Tab 컴포넌트 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            Tab 컴포넌트는 여러 탭을 제공하며, 각 탭에 따라 다른 콘텐츠를
            렌더링할 수 있습니다. 애니메이션 활성화 여부를 설정하여 부드러운
            전환 효과를 추가하거나 제거할 수 있습니다.
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 탭 전환 시 애니메이션 효과를 활성화하거나 비활성화 가능</li>
            <li>• 각 탭에 따라 동적 콘텐츠 렌더링 지원</li>
            <li>• Tailwind CSS를 활용한 간단한 스타일링</li>
          </ul>
        </div>
      </div>

      {/* 코드 사용 예제 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">코드 사용 예제</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <pre className="text-sm text-blue-800 overflow-x-auto">
            {`import { useState } from "react";
import Tab from "./Tab";

const Example = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = ["탭 1", "탭 2", "탭 3"];

  return (
    <Tab
      tabs={tabs}
      index={activeIndex}
      setIndex={setActiveIndex}
      animated={true} // 애니메이션 활성화
      renderContent={(index) => <p>탭 {index + 1}의 콘텐츠입니다.</p>}
    />
  );
};`}
          </pre>
        </div>
      </div>

      {/* 애니메이션 활성화된 탭 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">애니메이션 활성화</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <Tab
            tabs={tabs}
            index={activeIndexAnimated}
            setIndex={setActiveIndexAnimated}
            animated={true} // 애니메이션 활성화
            renderContent={renderTabContent}
          />
        </div>
      </div>

      {/* 애니메이션 비활성화된 탭 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">애니메이션 비활성화</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <Tab
            tabs={tabs}
            index={activeIndexNonAnimated}
            setIndex={setActiveIndexNonAnimated}
            animated={false} // 애니메이션 비활성화
            renderContent={renderTabContent}
          />
        </div>
      </div>

      {/* Props 설명 */}
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
              <h3 className="font-medium text-gray-900">animated</h3>
              <p className="text-sm text-gray-600">
                애니메이션 활성화 여부를 제어합니다. 기본값은 <code>true</code>
                입니다.
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
