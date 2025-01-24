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
