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

type PeriodKey =
  | "2025"
  | "2024"
  | "2023"
  | "2022"
  | "2021"
  | "2020"
  | "2019"
  | "2018"
  | "2017"
  | "2016"
  | "2015";

export default function TrendsPageComponent() {
  const dropdownItems = [
    { key: "2025", label: "2025" },
    { key: "2024", label: "2024" },
    { key: "2023", label: "2023" },
    { key: "2022", label: "2022" },
    { key: "2021", label: "2021" },
    { key: "2020", label: "2020" },
    { key: "2019", label: "2019" },
    { key: "2018", label: "2018" },
    { key: "2017", label: "2017" },
    { key: "2016", label: "2016" },
    { key: "2015", label: "2015" },
  ];
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>("2025");

  const periodMap = {
    2025: {
      hourly: useAverageListeningBreakdownPerHourOnYear(
        2025,
        selectedPeriod === "2025",
      ),
      daily: useAverageListeningBreakdownPerDayOnYear(
        2025,
        selectedPeriod === "2025",
      ),
      count: useCountTracksPerDayOnYear(2025, selectedPeriod === "2025"),
    },
    2024: {
      hourly: useAverageListeningBreakdownPerHourOnYear(
        2024,
        selectedPeriod === "2024",
      ),
      daily: useAverageListeningBreakdownPerDayOnYear(
        2024,
        selectedPeriod === "2024",
      ),
      count: useCountTracksPerDayOnYear(2024, selectedPeriod === "2024"),
    },
    2023: {
      hourly: useAverageListeningBreakdownPerHourOnYear(
        2023,
        selectedPeriod === "2023",
      ),
      daily: useAverageListeningBreakdownPerDayOnYear(
        2023,
        selectedPeriod === "2023",
      ),
      count: useCountTracksPerDayOnYear(2023, selectedPeriod === "2023"),
    },
    2022: {
      hourly: useAverageListeningBreakdownPerHourOnYear(
        2022,
        selectedPeriod === "2022",
      ),
      daily: useAverageListeningBreakdownPerDayOnYear(
        2022,
        selectedPeriod === "2022",
      ),
      count: useCountTracksPerDayOnYear(2022, selectedPeriod === "2022"),
    },
    2021: {
      hourly: useAverageListeningBreakdownPerHourOnYear(
        2021,
        selectedPeriod === "2021",
      ),
      daily: useAverageListeningBreakdownPerDayOnYear(
        2021,
        selectedPeriod === "2021",
      ),
      count: useCountTracksPerDayOnYear(2021, selectedPeriod === "2021"),
    },
    2020: {
      hourly: useAverageListeningBreakdownPerHourOnYear(
        2020,
        selectedPeriod === "2020",
      ),
      daily: useAverageListeningBreakdownPerDayOnYear(
        2020,
        selectedPeriod === "2020",
      ),
      count: useCountTracksPerDayOnYear(2020, selectedPeriod === "2020"),
    },
    2019: {
      hourly: useAverageListeningBreakdownPerHourOnYear(
        2019,
        selectedPeriod === "2019",
      ),
      daily: useAverageListeningBreakdownPerDayOnYear(
        2019,
        selectedPeriod === "2019",
      ),
      count: useCountTracksPerDayOnYear(2019, selectedPeriod === "2019"),
    },
    2018: {
      hourly: useAverageListeningBreakdownPerHourOnYear(
        2018,
        selectedPeriod === "2018",
      ),
      daily: useAverageListeningBreakdownPerDayOnYear(
        2018,
        selectedPeriod === "2018",
      ),
      count: useCountTracksPerDayOnYear(2018, selectedPeriod === "2018"),
    },
    2017: {
      hourly: useAverageListeningBreakdownPerHourOnYear(
        2017,
        selectedPeriod === "2017",
      ),
      daily: useAverageListeningBreakdownPerDayOnYear(
        2017,
        selectedPeriod === "2017",
      ),
      count: useCountTracksPerDayOnYear(2017, selectedPeriod === "2017"),
    },
    2016: {
      hourly: useAverageListeningBreakdownPerHourOnYear(
        2016,
        selectedPeriod === "2016",
      ),
      daily: useAverageListeningBreakdownPerDayOnYear(
        2016,
        selectedPeriod === "2016",
      ),
      count: useCountTracksPerDayOnYear(2016, selectedPeriod === "2016"),
    },
    2015: {
      hourly: useAverageListeningBreakdownPerHourOnYear(
        2015,
        selectedPeriod === "2015",
      ),
      daily: useAverageListeningBreakdownPerDayOnYear(
        2015,
        selectedPeriod === "2015",
      ),
      count: useCountTracksPerDayOnYear(2015, selectedPeriod === "2015"),
    },
  };

  const { hourly, daily, count } = periodMap[selectedPeriod as PeriodKey];

  return (
    <div className="h-[calc(100vh-106px)]">
      <div className="w-full h-[10%] flex items-center justify-between bg-primary-700 p-4">
        <p className="text-foreground">Listening Trends</p>
        <PeriodDropdown
          items={dropdownItems}
          onSelectionChange={(key) => setSelectedPeriod(key as PeriodKey)}
        />
      </div>
      <Divider />
      <div className="w-full h-[90%] flex items-center justify-center bg-primary-700 p-4">
        <div className="h-full w-full flex flex-col bg-primary-700">
          {/* Average Charts */}
          <div className="w-full h-[50%] flex flex-row gap-4 p-2">
            <TrendsAverageCard
              chartType="horizontal"
              data={processHourlyListening(hourly.hourlyAverage)}
              isLoading={hourly.isLoading}
              title="Average Listening Time per Hour"
              xAxisLabel="Hour"
              xTicks={["0:00", "6:00", "12:00", "18:00", "23:00"]}
              yAxisLabel="Duration"
              yAxisLabelOffset={-95}
            />
            <TrendsAverageCard
              chartType="vertical"
              data={processWeeklyListening(daily.dailyAverage)}
              isLoading={daily.isLoading}
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
              data={processYearCountTracks(
                count.dailySongCounts,
                Number(selectedPeriod as PeriodKey),
              )}
              isLoading={count.isLoading}
              title="Activity Calendar"
              year={Number(selectedPeriod as PeriodKey)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
