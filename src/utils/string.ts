// 문자열이 한국어인지 확인하는 함수
export const isKorean = (str: string): boolean => {
  return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(str);
};

// 문자열이 영어인지 확인하는 함수
export const isEnglish = (str: string): boolean => {
  return /[a-zA-Z]/.test(str);
};

// 문자열이 숫자인지 확인하는 함수
export const isNumber = (str: string): boolean => {
  return /[0-9]/.test(str);
};
