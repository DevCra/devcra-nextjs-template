"use client";

import { useState } from "react";
import { DropdownSingle, DropdownOption } from "./DropdownSingle";
import { DropdownMultiple } from "./DropdownMultiple";

// 예제 데이터
const countryOptions: DropdownOption[] = [
  { label: "대한민국", value: "kr" },
  { label: "미국", value: "us" },
  { label: "일본", value: "jp" },
  { label: "중국", value: "cn" },
  { label: "영국", value: "uk" },
  { label: "프랑스", value: "fr" },
  { label: "독일", value: "de" },
  { label: "이탈리아", value: "it" },
  { label: "스페인", value: "es" },
  { label: "캐나다", value: "ca" },
];

const languageOptions: DropdownOption[] = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "py" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "cs" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "PHP", value: "php" },
  { label: "Ruby", value: "ruby" },
];

const categoryOptions: DropdownOption[] = [
  { label: "웹 개발", value: "web" },
  { label: "모바일 개발", value: "mobile" },
  { label: "데이터 분석", value: "data" },
  { label: "인공지능", value: "ai" },
  { label: "보안", value: "security" },
  { label: "클라우드", value: "cloud" },
];

export default function SelectExample() {
  const [selectedCountry, setSelectedCountry] = useState<
    DropdownOption | undefined
  >();
  const [selectedLanguages, setSelectedLanguages] = useState<DropdownOption[]>(
    [],
  );
  const [selectedCategories, setSelectedCategories] = useState<
    DropdownOption[]
  >([]);
  const [disabledCountry, setDisabledCountry] = useState<
    DropdownOption | undefined
  >();
  const [topMenuCountry, setTopMenuCountry] = useState<
    DropdownOption | undefined
  >();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Select 컴포넌트 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            현재 Select 컴포넌트는 다음과 같은 기능을 제공합니다:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • 단일 선택 (DropdownSingle) 및 다중 선택 (DropdownMultiple)
            </li>
            <li>• 검색 기능으로 옵션 필터링</li>
            <li>• 키보드 네비게이션 (ESC 키로 닫기)</li>
            <li>• 클릭 외부 영역으로 드롭다운 닫기</li>
            <li>• 메뉴 위치 설정 (상단/하단)</li>
            <li>• 리셋 버튼 및 전체 선택 기능</li>
            <li>• 비활성화 상태 지원</li>
            <li>• TypeScript 완전 지원</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">기본 사용법</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <pre className="text-sm text-blue-800 overflow-x-auto">
            {`// 단일 선택
import { DropdownSingle, DropdownOption } from "@/ui/select/DropdownSingle";

const options: DropdownOption[] = [
  { label: "옵션 1", value: "1" },
  { label: "옵션 2", value: "2" },
];

const [selected, setSelected] = useState<DropdownOption>();

<DropdownSingle
  options={options}
  selected={selected}
  onSelect={setSelected}
  label="선택하세요"
  placeholder="옵션을 선택하세요"
/>

// 다중 선택
import { DropdownMultiple } from "@/ui/select/DropdownMultiple";

const [selected, setSelected] = useState<DropdownOption[]>([]);

<DropdownMultiple
  options={options}
  selected={selected}
  onSelect={setSelected}
  label="다중 선택"
  placeholder="여러 옵션을 선택하세요"
/>`}
          </pre>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">실제 예제</h2>
        <div className="space-y-6">
          {/* 단일 선택 기본 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">단일 선택 (기본)</h3>
            <div className="mb-4">
              <DropdownSingle
                options={countryOptions}
                selected={selectedCountry}
                onSelect={setSelectedCountry}
                label="국가"
                placeholder="국가를 선택하세요"
              />
            </div>
            <div className="text-sm text-gray-600">
              선택된 값:{" "}
              {selectedCountry
                ? `${selectedCountry.label} (${selectedCountry.value})`
                : "없음"}
            </div>
          </div>

          {/* 다중 선택 기본 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">다중 선택 (기본)</h3>
            <div className="mb-4">
              <DropdownMultiple
                options={languageOptions}
                selected={selectedLanguages}
                onSelect={setSelectedLanguages}
                label="프로그래밍 언어"
                placeholder="언어를 선택하세요"
              />
            </div>
            <div className="text-sm text-gray-600">
              선택된 값:{" "}
              {selectedLanguages.length > 0
                ? selectedLanguages
                    .map((lang) => `${lang.label} (${lang.value})`)
                    .join(", ")
                : "없음"}
            </div>
          </div>

          {/* 다양한 옵션들 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">다양한 옵션들</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 리셋 버튼 */}
              <div>
                <h4 className="font-medium mb-2">리셋 버튼</h4>
                <DropdownSingle
                  options={countryOptions}
                  selected={selectedCountry}
                  onSelect={setSelectedCountry}
                  label="국가"
                  placeholder="국가를 선택하세요"
                  isResetButtonShown={true}
                />
              </div>

              {/* 비활성화 */}
              <div>
                <h4 className="font-medium mb-2">비활성화</h4>
                <DropdownSingle
                  options={countryOptions}
                  selected={disabledCountry}
                  onSelect={setDisabledCountry}
                  label="국가"
                  placeholder="비활성화된 드롭다운"
                  disabled={true}
                />
              </div>

              {/* 상단 메뉴 */}
              <div>
                <h4 className="font-medium mb-2">상단 메뉴</h4>
                <DropdownSingle
                  options={countryOptions}
                  selected={topMenuCountry}
                  onSelect={setTopMenuCountry}
                  label="국가"
                  placeholder="상단에 메뉴 표시"
                  menuLocation="top"
                />
              </div>

              {/* 검색 비활성화 */}
              <div>
                <h4 className="font-medium mb-2">검색 비활성화</h4>
                <DropdownSingle
                  options={countryOptions}
                  selected={selectedCountry}
                  onSelect={setSelectedCountry}
                  label="국가"
                  placeholder="검색 없음"
                  hasSearch={false}
                />
              </div>
            </div>
          </div>

          {/* 다중 선택 고급 기능 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">다중 선택 고급 기능</h3>
            <div className="mb-4">
              <DropdownMultiple
                options={categoryOptions}
                selected={selectedCategories}
                onSelect={setSelectedCategories}
                label="카테고리"
                placeholder="카테고리를 선택하세요"
                isResetButtonShown={true}
              />
            </div>
            <div className="text-sm text-gray-600">
              선택된 값:{" "}
              {selectedCategories.length > 0
                ? selectedCategories
                    .map((cat) => `${cat.label} (${cat.value})`)
                    .join(", ")
                : "없음"}
            </div>
          </div>

          {/* 라벨 숨김 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">라벨 숨김</h3>
            <div className="mb-4">
              <DropdownSingle
                options={countryOptions}
                selected={selectedCountry}
                onSelect={setSelectedCountry}
                placeholder="라벨이 숨겨진 드롭다운"
                isHideLabel={true}
              />
            </div>
          </div>

          {/* 필수 입력 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">필수 입력</h3>
            <div className="mb-4">
              <DropdownSingle
                options={countryOptions}
                selected={selectedCountry}
                onSelect={setSelectedCountry}
                label="국가"
                placeholder="국가를 선택하세요"
                required={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Props 설명</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">공통 Props</h3>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                <li>
                  • <code className="bg-gray-200 px-1 rounded">options</code>:
                  선택 가능한 옵션 배열
                </li>
                <li>
                  • <code className="bg-gray-200 px-1 rounded">onSelect</code>:
                  선택 변경 시 호출되는 함수
                </li>
                <li>
                  • <code className="bg-gray-200 px-1 rounded">label</code>:
                  라벨 텍스트
                </li>
                <li>
                  • <code className="bg-gray-200 px-1 rounded">disabled</code>:
                  비활성화 여부
                </li>
                <li>
                  •{" "}
                  <code className="bg-gray-200 px-1 rounded">menuLocation</code>
                  : 메뉴 위치 ("top" | "bottom")
                </li>
                <li>
                  • <code className="bg-gray-200 px-1 rounded">hasSearch</code>:
                  검색 기능 활성화 여부
                </li>
                <li>
                  •{" "}
                  <code className="bg-gray-200 px-1 rounded">
                    isResetButtonShown
                  </code>
                  : 리셋 버튼 표시 여부
                </li>
                <li>
                  •{" "}
                  <code className="bg-gray-200 px-1 rounded">isHideLabel</code>:
                  라벨 숨김 여부
                </li>
                <li>
                  •{" "}
                  <code className="bg-gray-200 px-1 rounded">placeholder</code>:
                  플레이스홀더 텍스트
                </li>
                <li>
                  • <code className="bg-gray-200 px-1 rounded">required</code>:
                  필수 입력 여부
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                DropdownSingle Props
              </h3>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                <li>
                  • <code className="bg-gray-200 px-1 rounded">selected</code>:
                  현재 선택된 옵션
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                DropdownMultiple Props
              </h3>
              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                <li>
                  • <code className="bg-gray-200 px-1 rounded">selected</code>:
                  현재 선택된 옵션 배열
                </li>
                <li>
                  •{" "}
                  <code className="bg-gray-200 px-1 rounded">
                    scrollClassName
                  </code>
                  : 스크롤 영역 스타일 클래스
                </li>
                <li>
                  •{" "}
                  <code className="bg-gray-200 px-1 rounded">
                    placeholderClassName
                  </code>
                  : 플레이스홀더 스타일 클래스
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
