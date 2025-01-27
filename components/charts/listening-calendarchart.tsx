"use client";

import { ResponsiveCalendar } from "@nivo/calendar";
import { useTheme } from "next-themes";

interface ListeningCalendarChartProps {
  data: Array<{
    day: string;
    value: number;
  }>;
  year: number;
  className?: string;
}

export default function ListeningCalendarChart({
  data,
  year,
  className,
}: ListeningCalendarChartProps) {
  const { theme } = useTheme();

  const fromDate = `${year}-01-02`;
  const toDate = `${year}-12-31`;

  return (
    <div className={`${className}`}>
      <ResponsiveCalendar
        colors={[
          "#D3F8CE",
          "#A2F29F",
          "#6ADA71",
          "#40B553",
          "#138430",
          "#0D7131",
          "#095F30",
          "#064C2C",
          "#033F2A",
        ]}
        data={data}
        dayBorderColor="#FFFFFF"
        dayBorderWidth={2}
        emptyColor="#EEEEEE"
        from={fromDate}
        margin={{ top: 10, right: 55, bottom: 10, left: 30 }}
        maxValue={200}
        minValue={0}
        monthBorderColor="#FFFFFF"
        theme={{
          labels: {
            text: {
              fill: theme === "dark" ? "#C5E4F6" : "#7A2528", // bg-primary-100
            },
          },
          tooltip: {
            container: {
              background: theme === "dark" ? "#5193CB" : "#B76A61", // bg-primary-300
              border: theme === "dark" ? "#8EC6ED" : "#93403D", // bg-primary-200
              color: theme === "dark" ? "#C5E4F6" : "#7A2528",
              fontSize: 12,
              fontWeight: "bold",
              borderRadius: "4px",
              padding: "8px",
            },
          },
        }}
        to={toDate}
        yearSpacing={40}
      />
    </div>
  );
}
