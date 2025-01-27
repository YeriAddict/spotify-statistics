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
  yAxisLabel: string;
  yAxisLabelOffset: number;
  xTicks?: string[];
  className?: string;
}

export default function BreakdownHorizontalBarChart({
  data,
  xAxisLabel,
  yAxisLabel,
  yAxisLabelOffset,
  xTicks,
  className,
}: BreakdownBarChartProps) {
  const { theme } = useTheme();

  const getYAxisUnit = (
    data: Array<{
      label: string;
      duration: number;
    }>,
  ) => {
    if (data.length === 24) return { unit: "minutes", divisor: 60 };
    if (data.length === 7) return { unit: "hours", divisor: 3600 };
    if (data.length === 12) return { unit: "days", divisor: 86400 };

    return { unit: "hours", divisor: 3600 };
  };

  const { unit, divisor } = getYAxisUnit(data);

  const finalData = data.map((item) => ({
    label: item.label,
    rawDuration: item.duration,
    duration: item.duration / divisor,
  }));

  return (
    <div className={`${className}`}>
      <ResponsiveContainer>
        <BarChart
          data={finalData}
          layout="horizontal"
          margin={{
            top: 5,
            right: 15,
            left: 15,
            bottom: 15,
          }}
        >
          <CartesianGrid
            horizontal
            stroke={theme === "dark" ? "#C5E4F6" : "#7A2528"} // bg-primary-100
            strokeDasharray="5 5"
            vertical={false}
          />
          <XAxis
            angle={data.length === 7 || data.length === 12 ? -45 : 0}
            dataKey="label"
            interval={0}
            label={{
              value: xAxisLabel,
              position: "insideBottom",
              dx: 15,
              dy: 15,
              fill: theme === "dark" ? "#C5E4F6" : "#7A2528", // bg-primary-100
              style: { fontWeight: "bold" },
            }}
            tick={{
              fill: theme === "dark" ? "#C5E4F6" : "#7A2528", // bg-primary-100
              textAnchor:
                data.length === 7 || data.length === 12 ? "end" : "middle",
              style:
                data.length === 7 || data.length === 12
                  ? { fontSize: "8px" }
                  : { fontSize: "16px" },
            }}
            ticks={xTicks}
            type="category"
          />

          <YAxis
            label={{
              value: `${yAxisLabel} (${unit})`,
              angle: -90,
              position: "top",
              offset: yAxisLabelOffset,
              dx: -10,
              fill: theme === "dark" ? "#C5E4F6" : "#7A2528", // bg-primary-100
              style: { fontWeight: "bold" },
            }}
            tick={{
              fill: theme === "dark" ? "#C5E4F6" : "#7A2528", // bg-primary-100
            }}
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
            dataKey="duration"
            fill={theme === "dark" ? "#000A28" : "#FFF9F2"} // bg-primary-900
            stroke={theme === "dark" ? "#C5E4F6" : "#7A2528"} // bg-primary-100
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
