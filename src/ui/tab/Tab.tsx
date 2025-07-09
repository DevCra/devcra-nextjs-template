import clsx from "clsx";
import { ReactNode, useRef, useEffect, useState } from "react";

interface TabProps {
  tabs: string[]; // 탭 이름 배열
  index: number; // 현재 활성화된 탭 인덱스
  setIndex: (index: number) => void; // 탭 변경 함수
  renderContent?: (index: number) => ReactNode; // 탭에 따라 렌더링할 콘텐츠
}

const Tab = ({ tabs, index, setIndex, renderContent }: TabProps) => {
  const [barStyle, setBarStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    if (tabRefs.current[index]) {
      const { offsetWidth, offsetLeft } = tabRefs.current[index];
      setBarStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, [index]);

  return (
    <div className="flex flex-col">
      {/* 탭 헤더 */}
      <div className="relative flex border-b border-gray-200">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            ref={(el) => {
              if (el) tabRefs.current[i] = el;
            }}
            onClick={() => setIndex(i)}
            className={clsx(
              "px-4 py-2 text-sm font-medium transition-colors duration-300",
              index === i
                ? "text-indigo-600"
                : "text-gray-500 hover:text-indigo-600",
            )}
          >
            {tab}
          </button>
        ))}

        {/* 애니메이션 바 */}
        <div
          className="absolute bottom-0 h-0.5 bg-indigo-600 transition-all duration-300"
          style={{
            width: `${barStyle.width}px`,
            left: `${barStyle.left}px`,
          }}
        />
      </div>

      {/* 탭 콘텐츠 */}
      <div className="relative mt-4 overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {tabs.map((_, i) => (
            <div key={i} className="w-full flex-shrink-0">
              {renderContent && renderContent(i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tab;
