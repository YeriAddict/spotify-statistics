import { useTheme } from "next-themes";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

import { secondsToString } from "@/utils/time-processing";

interface BreakdownBarChartProps {
  data: Array<{
    label: string;
    duration: number;
  }>;
  xAxisLabel: string;
  yTicks?: string[];
  className?: string;
}

export default function BreakdownVerticalBarChart({
  data,
  xAxisLabel,
  yTicks,
  className,
}: BreakdownBarChartProps) {
  const { theme } = useTheme();

  const divisor = 3600;

  const finalData = data.map((item) => ({
    label: item.label,
    rawDuration: item.duration,
    duration: item.duration / divisor,
  }));

  const xTicks = [0, 4, 8, 12, 16, 20, 24];

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer>
        <BarChart
          data={finalData}
          layout="vertical"
          margin={{
            top: 5,
            right: 15,
            left: 35,
            bottom: 15,
          }}
        >
          <CartesianGrid
            vertical
            horizontal={false}
            stroke={theme === "dark" ? "#C5E4F6" : "#7A2528"} // bg-primary-100
            strokeDasharray="5 5"
          />
          <YAxis
            dataKey="label"
            interval={0}
            tick={{
              fill: theme === "dark" ? "#C5E4F6" : "#7A2528", // bg-primary-100
              textAnchor: "end",
              style: { fontSize: "16px" },
            }}
            ticks={yTicks}
            type="category"
          />
          <XAxis
            label={{
              value: `${xAxisLabel} (hours)`,
              position: "insideBottom",
              dx: 15,
              dy: 15,
              fill: theme === "dark" ? "#C5E4F6" : "#7A2528", // bg-primary-100
              style: { fontWeight: "bold" },
            }}
            tick={{
              fill: theme === "dark" ? "#C5E4F6" : "#7A2528", // bg-primary-100
            }}
            ticks={xTicks}
            type="number"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#5193CB" : "#B76A61", // bg-primary-300
              borderColor: theme === "dark" ? "#8EC6ED" : "#93403D", // bg-primary-200
              color: theme === "dark" ? "#C5E4F6" : "#7A2528",
            }}
            cursor={{
              fill: theme === "dark" ? "#4C0336" : "#FFE4E2", // bg-danger-900
              opacity: 0.99,
            }}
            formatter={(_, name: string, props: any) => {
              const capitalize = (str: string) =>
                str.charAt(0).toUpperCase() + str.slice(1);

              const rawDuration = props.payload?.rawDuration || 0;

              return [secondsToString(rawDuration), capitalize(name)];
            }}
          />
          <Bar
            background={{ fill: theme === "dark" ? "#000F3080" : "#FFF1E680" }} // bg-primary-800
            dataKey="duration"
            fill={theme === "dark" ? "#000A28" : "#FFF9F2"} // bg-primary-900
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
