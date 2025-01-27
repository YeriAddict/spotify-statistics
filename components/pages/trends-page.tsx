"use client";

import { Divider } from "@heroui/react";
import { useState } from "react";

import PeriodDropdown from "../dropdowns/period-dropdown";
import { TrendsAverageCard } from "../cards/trends-average-card";
import { TrendsCalendarCard } from "../cards/trends-calendar-card";

import {
  useAverageListeningBreakdownPerDayOnYear,
  useAverageListeningBreakdownPerHourOnYear,
} from "@/hooks/useListeningBreakdown";
import {
  processHourlyListening,
  processWeeklyListening,
  processYearCountTracks,
} from "@/utils/chart-data-processing";
import { useCountTracksPerDayOnYear } from "@/hooks/useCountTracks";

export default function TrendsPageComponent() {
  const dropdownItems = [
    { key: "today", label: "Today" },
    { key: "last_week", label: "This Week" },
    { key: "last_month", label: "This Month" },
    { key: "last_year", label: "This Year" },
  ];
  const [selectedPeriod, setSelectedPeriod] = useState<string>("today");

  const { hourlyAverage, isLoading: isLoadingHourly } =
    useAverageListeningBreakdownPerHourOnYear(2024, true);

  const { dailyAverage, isLoading: isLoadingDaily } =
    useAverageListeningBreakdownPerDayOnYear(2024, true);

  const { dailySongCounts, isLoading: isLoadingCalendar } =
    useCountTracksPerDayOnYear(2024, true);

  return (
    <div className="h-[calc(100vh-106px)]">
      <div className="w-full h-[10%] flex items-center justify-between bg-primary-700 p-4">
        <p className="text-foreground">Listening Trends</p>
        <PeriodDropdown
          items={dropdownItems}
          onSelectionChange={(key) => setSelectedPeriod(key)}
        />
      </div>
      <Divider />
      <div className="w-full h-[90%] flex items-center justify-center bg-primary-700 p-4">
        <div className="h-full w-full flex flex-col bg-primary-700">
          {/* Average Charts */}
          <div className="w-full h-[50%] flex flex-row gap-4 p-2">
            <TrendsAverageCard
              chartType="horizontal"
              data={processHourlyListening(hourlyAverage)}
              isLoading={isLoadingHourly}
              title="Average Listening Time per Hour"
              xAxisLabel="Hour"
              xTicks={["0:00", "6:00", "12:00", "18:00", "23:00"]}
              yAxisLabel="Duration"
              yAxisLabelOffset={-95}
            />
            <TrendsAverageCard
              chartType="vertical"
              data={processWeeklyListening(dailyAverage)}
              isLoading={isLoadingDaily}
              title="Average Listening Time per Day"
              xAxisLabel="Duration"
              yAxisLabel="Day"
              yAxisLabelOffset={0}
              yTicks={[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ]}
            />
          </div>

          {/* Calendar Chart */}
          <div className="w-full h-[50%] flex flex-row gap-4 p-2">
            <TrendsCalendarCard
              data={processYearCountTracks(dailySongCounts, 2024)}
              isLoading={isLoadingCalendar}
              title="Activity Calendar"
              year={2024}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
