export const getCurrentDateInfo = () => {
  const currentDate = new Date();

  // Current date information
  const year = currentDate.getFullYear();
  const previousYear = year - 1;
  const month = currentDate.getMonth() + 1;
  const previousMonth = month === 1 ? 12 : month - 1;
  const previousYearBasedOnMonth = month === 1 ? year - 1 : year;
  const day = currentDate.getDate();
  const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  // Previous date information
  const previousDate = new Date(currentDate);

  previousDate.setDate(currentDate.getDate() - 1);
  const previousDay = previousDate.getDate();
  const previousFormattedDate = `${previousDate.getFullYear()}-${String(previousDate.getMonth() + 1).padStart(2, "0")}-${String(previousDay).padStart(2, "0")}`;

  // Last week's date information
  const lastWeekDate = new Date(currentDate);

  lastWeekDate.setDate(currentDate.getDate() - 7);
  const lastWeekDay = lastWeekDate.getDate();
  const lastWeekFormattedDate = `${lastWeekDate.getFullYear()}-${String(lastWeekDate.getMonth() + 1).padStart(2, "0")}-${String(lastWeekDay).padStart(2, "0")}`;

  return {
    year,
    month,
    formattedDate,
    previousYear,
    previousMonth,
    previousYearBasedOnMonth,
    previousFormattedDate,
    lastWeekFormattedDate,
  };
};
