export function processHourlyListening(hourlyListening: number[] | undefined) {
  if (!hourlyListening) return [];

  return hourlyListening.map((seconds, hour) => ({
    label: `${hour}:00`,
    duration: seconds,
  }));
}

export function processWeeklyListening(weeklyListening: number[] | undefined) {
  if (!weeklyListening) return [];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return weeklyListening.map((seconds, index) => ({
    label: daysOfWeek[index],
    duration: seconds,
  }));
}

export function processMonthlyListening(
  monthlyListening: number[] | undefined,
) {
  if (!monthlyListening) return [];

  return monthlyListening.map((seconds, day) => ({
    label: `${day + 1}`,
    duration: seconds,
  }));
}

export function processYearlyListening(yearlyListening: number[] | undefined) {
  if (!yearlyListening) return [];

  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return yearlyListening.map((seconds, month) => ({
    label: monthsOfYear[month],
    duration: seconds,
  }));
}

export function processYearCountTracks(songCounts: number[], year: number) {
  const isLeapYear = (year: number) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const daysInYear = isLeapYear(year) ? 366 : 365;

  const processedData = Array.from({ length: daysInYear }, (_, i) => {
    const date = new Date(year, 0, i + 1);
    const formattedDate = date.toISOString().split("T")[0];

    return songCounts[i] > 0
      ? {
          value: songCounts[i],
          day: formattedDate,
        }
      : null;
  }).filter((item) => item !== null);

  return processedData as { value: number; day: string }[];
}
