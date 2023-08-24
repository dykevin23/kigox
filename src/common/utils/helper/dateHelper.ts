export const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const setMonthDay = (value: number) => {
    return value < 10 ? `0${value}` : value;
  };

  return `${year}${setMonthDay(month)}${setMonthDay(day)}`;
};

export const convertUtcToDate = (value: string) => {
  if (!value) return "";
  const timestamp = new Date(value);

  // UTC+9 타임존에 맞게 변환
  const utcOffset = 9 * 60; // 9 hours in minutes
  const localTimestamp = new Date(timestamp.getTime() + utcOffset * 60000);

  // 변환된 시간을 원하는 포맷으로 표시
  return localTimestamp.toISOString();
};
