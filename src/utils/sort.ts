// 정렬 기준

import { DropdownOption } from "@/ui/select/DropdownSingle";
import { isEnglish, isNumber, isKorean } from "./string";

// 문자열의 첫 글자 타입을 반환하는 함수
const getFirstCharType = (str: string): number => {
  if (isEnglish(str[0])) {
    return 0;
  }

  if (isKorean(str[0])) {
    return 1;
  }

  if (isNumber(str[0])) {
    return 2;
  }

  return 3;
};

// 영어 - 한국어 - 숫자 - 기타(구두점 등) 순으로 정렬하는 함수
export const getSortedOptions = (
  options: DropdownOption[],
): DropdownOption[] => {
  return [...options].sort((a, b) => {
    const aType = getFirstCharType(a.label);
    const bType = getFirstCharType(b.label);

    // 타입이 다르면 타입 순서대로 정렬
    if (aType !== bType) {
      return aType - bType;
    }

    // 타입이 같으면 문자열 비교
    return a.label.localeCompare(b.label, "ko");
  });
};
