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
