// 퍼센트 -> 소수점
export const convertPercentageToDecimal = (percentage: number): number => {
  return percentage / 100;
};

// 소수점 -> 퍼센트
export const convertDecimalToPercentage = (decimal: number): number => {
  return decimal * 100;
};
