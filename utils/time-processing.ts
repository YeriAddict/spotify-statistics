export function secondsToString(
  seconds: number,
  isSign: boolean = false,
): string {
  const isNegative = seconds < 0;
  const absSeconds = Math.abs(seconds);

  const days = Math.floor(absSeconds / (3600 * 24));
  const hours = Math.floor((absSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((absSeconds % 3600) / 60);
  const remainingSeconds = absSeconds % 60;

  const formattedDays = days > 0 ? `${days}d ` : "";
  const formattedHours =
    days > 0 || hours > 0 ? `${hours.toString().padStart(2, "0")}h ` : "";
  const formattedMinutes =
    minutes > 0 || hours > 0 || days > 0
      ? `${minutes.toString().padStart(2, "0")}m `
      : "";
  const formattedSeconds = `${remainingSeconds.toString().padStart(2, "0")}s`;

  const formatted =
    absSeconds < 3600
      ? `${formattedMinutes}${formattedSeconds}`
      : absSeconds < 3600 * 24
        ? `${formattedHours}${formattedMinutes}${formattedSeconds}`
        : `${formattedDays}${formattedHours}${formattedMinutes}${formattedSeconds}`;

  if (isSign) {
    return isNegative ? `-${formatted.trim()}` : `+${formatted.trim()}`;
  } else {
    return formatted.trim();
  }
}
