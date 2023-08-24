/*****************************************************************
 *****************************************************************
 * 사용자 정보, 자녀 정보 등 기초 정보
 *****************************************************************
 *****************************************************************/
export type Provider = "naver" | "kakao";

// 소득구간 incomeRange
export const INCOME_RANGE: { [key: string]: number[] } = {
  "0": [100, 199],
  "1": [200, 299],
  "2": [300, 399],
  "3": [400, 499],
  "4": [500],
};

// 자녀 성숙도 maturity
export const MATURITY: { [key: string]: number[] } = {
  "0": [0, 6],
  "1": [7, 12],
  "2": [13, 24],
  "3": [25, 36],
  "4": [37],
};

/**
 * 표준화 기준
 * age          사용자 나이
 * gender       사용자 성별
 * distance     주소(주소간 거리)
 * childAge     자녀 나이
 * childGender  자녀 성별
 * incomeRange  소득구간
 * maturity     자녀 성숙도
 */
export const STANDARD_DATA: { [key: string]: string } = {
  age: "age",
  gender: "gender",
  distance: "distance",
  childAge: "childAge",
  childGender: "childGender",
  incomeRange: "incomeRange",
  maturity: "maturity",
};

export const STANDARD_TYPE: { [key: string]: string } = {
  range: "range",
  fixed: "fixed",
};

export const STANDARD_UNIT: { [key: string]: string } = {
  "0": "km",
  "1": "개월",
  "2": "만원",
};

/*****************************************************************
 *****************************************************************
 * 상품관련
 *****************************************************************
 *****************************************************************/

// 선호거래방식
export const TRADE_METHOD: { [key: string]: string } = {
  direct: "직거래",
  delivery: "택배",
};

// 추천연력
export const RECOMMEND_AGE: { [key: string]: string } = {
  "0": "전체",
  "1": "돌 전",
  "2": "돌 ~ 6세",
  "3": "6세 ~",
};

export const GENDER: { [key: string]: string } = {
  none: "구분없음",
  male: "남",
  female: "여",
};
