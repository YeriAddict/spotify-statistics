export function stringToSeconds(durationString: string | undefined): number {
  if (!durationString) return 0;

  const regex = /(\d+)h(\d+)m(\d+)s/;
  const match = durationString.match(regex);

  if (!match) return 0;

  const [, hours, minutes, seconds] = match.map(Number);

  return hours * 3600 + minutes * 60 + seconds;
}

export function secondsToString(seconds: number): string {
  const isNegative = seconds < 0;
  const absSeconds = Math.abs(seconds);

  const hours = Math.floor(absSeconds / 3600);
  const minutes = Math.floor((absSeconds % 3600) / 60);
  const remainingSeconds = absSeconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  const formatted = `${formattedHours}h${formattedMinutes}m${formattedSeconds}s`;

  return isNegative ? `-${formatted}` : formatted;
}

export function formatDifference(current: number, previous: number) {
  const diff = current - previous;

  return diff > 0 ? `+${diff}` : `${diff}`;
}

export function formatDifferenceInTime(
  current: string,
  previous: string,
): string {
  const currentSeconds = stringToSeconds(current);
  const previousSeconds = stringToSeconds(previous);
  const difference = currentSeconds - previousSeconds;

  return difference !== 0
    ? `${difference > 0 ? "+" : ""}${secondsToString(difference)}`
    : "00h00m00s";
}
