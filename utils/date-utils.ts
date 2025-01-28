export const getCurrentDateInfo = () => {
  const currentDate = new Date();

  // Current date information
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  // Previous date information
  const previousDate = new Date(currentDate);

  previousDate.setDate(currentDate.getDate() - 1);

  const previousYear = previousDate.getFullYear();
  const previousMonth = previousDate.getMonth() + 1;
  const previousDay = previousDate.getDate();
  const previousFormattedDate = `${previousYear}-${String(previousMonth).padStart(2, "0")}-${String(previousDay).padStart(2, "0")}`;

  // Last week's date information
  const lastWeekDate = new Date(currentDate);

  lastWeekDate.setDate(currentDate.getDate() - 7);

  const lastWeekYear = lastWeekDate.getFullYear();
  const lastWeekMonth = lastWeekDate.getMonth() + 1;
  const lastWeekDay = lastWeekDate.getDate();
  const lastWeekFormattedDate = `${lastWeekYear}-${String(lastWeekMonth).padStart(2, "0")}-${String(lastWeekDay).padStart(2, "0")}`;

  return {
    year,
    month,
    day,
    formattedDate,
    previousYear,
    previousMonth,
    previousDay,
    previousFormattedDate,
    lastWeekYear,
    lastWeekMonth,
    lastWeekDay,
    lastWeekFormattedDate,
  };
};
