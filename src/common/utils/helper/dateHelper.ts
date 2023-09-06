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

export const getUpdatedAt = (updatedAt: string) => {
  const updatedAtDate = updatedAt.split("T")[0].replace(/\D/g, "");
  const updatedAtTime = updatedAt.split("T")[1];

  const date = new Date();
  if (String(date.getFullYear()) !== updatedAtDate.substring(0, 4)) {
    const calculateYear =
      date.getFullYear() - parseInt(updatedAtDate.substring(0, 4));

    if (calculateYear === 1) {
      return "작년";
    } else {
      return `${calculateYear} 년전`;
    }
  } else if (date.getMonth() + 1 !== parseInt(updatedAtDate.substring(4, 6))) {
    const calculateMonth =
      date.getMonth() + 1 - parseInt(updatedAtDate.substring(4, 6));
    return `${calculateMonth} 개월전`;
  } else if (date.getDate() !== parseInt(updatedAtDate.substring(6, 8))) {
    const calculateDate =
      date.getDate() - parseInt(updatedAtDate.substring(6, 8));
    return `${calculateDate} 일전`;
  } else {
    // Today
    const hour = parseInt(updatedAtTime.split(":")[0]);
    const minutes = parseInt(updatedAtTime.split(":")[1]);
    if (date.getHours() !== hour) {
      const calculateHour = date.getHours() - hour;
      return `${calculateHour} 시간전`;
    } else if (date.getMinutes() !== minutes) {
      const calculateMinutes = date.getMinutes() - minutes;
      return `${calculateMinutes} 분전`;
    } else {
      return "방금전";
    }
  }
};
