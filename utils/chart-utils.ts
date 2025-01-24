export function generateListeningBreakdownXTicks(
  data: Array<{ label: string; duration: number }>,
) {
  const step = 5;
  const ticks = [];

  for (let i = 1; i <= data.length; i += step) {
    ticks.push(i.toString());
  }

  if (data.length % step !== 0 || !ticks.includes(data.length.toString())) {
    ticks.push(data.length.toString());
  }

  return ticks;
}
