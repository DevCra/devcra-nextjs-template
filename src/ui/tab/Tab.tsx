import clsx from "clsx";
import { ReactNode } from "react";

interface TabProps {
  tabs: string[]; // 탭 이름 배열
  index: number; // 현재 활성화된 탭 인덱스
  setIndex: (index: number) => void; // 탭 변경 함수
  renderContent?: (index: number) => ReactNode; // 탭에 따라 렌더링할 콘텐츠
}

const Tab = ({ tabs, index, setIndex, renderContent }: TabProps) => {
  return (
    <div className="flex flex-col">
      {/* 탭 헤더 */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setIndex(i)}
            className={clsx(
              "px-4 py-2 text-sm font-medium",
              index === i
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-indigo-600",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="mt-4">{renderContent && renderContent(index)}</div>
    </div>
  );
};

export default Tab;
