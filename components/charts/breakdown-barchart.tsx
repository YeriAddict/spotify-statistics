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

interface BreakdownBarChartProps {
  data: Array<{
    hour: string;
    duration: number;
  }>;
}

export default function BreakdownBarChart({ data }: BreakdownBarChartProps) {
  const { theme } = useTheme();

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer>
        <BarChart
          data={data}
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
            dataKey="hour"
            label={{
              value: "Hour",
              position: "insideBottom",
              dx: 15,
              dy: 15,
              fill: theme === "dark" ? "#C5E4F6" : "#7A2528", // bg-primary-100
            }}
            tick={{
              fill: theme === "dark" ? "#C5E4F6" : "#7A2528", // bg-primary-100
            }}
            ticks={["0:00", "6:00", "12:00", "18:00"]}
          />
          <YAxis
            label={{
              value: "Duration (min)",
              angle: -90,
              position: "top",
              offset: -155,
              dx: -10,
              fill: theme === "dark" ? "#C5E4F6" : "#7A2528", // bg-primary-100
            }}
            tick={{
              fill: theme === "dark" ? "#C5E4F6" : "#7A2528", // bg-primary-100
            }}
            ticks={["15", "30", "45", "60"]}
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
            formatter={(value: number, name: string) => {
              const minutes = Math.floor(value);
              const seconds = Math.round((value - minutes) * 60);

              return [`${minutes} min ${seconds} s`, name];
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
