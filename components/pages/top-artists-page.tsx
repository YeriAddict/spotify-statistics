"use client";

import { Divider } from "@heroui/react";
import { useState } from "react";

import PeriodDropdown from "../dropdowns/period-dropdown";
import { RecordTable } from "../tables/record-table";

import {
  useTopArtistsOnDate,
  useTopArtistsOnLifetime,
  useTopArtistsOnMonth,
  useTopArtistsOnWeek,
  useTopArtistsOnYear,
} from "@/hooks/useTopArtists";
import { secondsToString } from "@/utils/time-processing";

export default function TopArtistsPageComponent() {
  const dropdownItems = [
    { key: "today", label: "Today" },
    { key: "this_week", label: "This Week" },
    { key: "this_month", label: "This Month" },
    { key: "this_year", label: "This Year" },
    { key: "all_time", label: "All Time" },
  ];

  type PeriodKey =
    | "today"
    | "this_week"
    | "this_month"
    | "this_year"
    | "all_time";
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>("today");

  const {
    artists: todayArtists,
    isLoading: todayLoading,
    hasMore: todayHasMore,
    loadMore: loadMoreToday,
  } = useTopArtistsOnDate("2024-11-25", 10, selectedPeriod === "today");
  const {
    artists: weekArtists,
    isLoading: weekLoading,
    hasMore: weekHasMore,
    loadMore: loadMoreWeek,
  } = useTopArtistsOnWeek("2024-11-25", 10, selectedPeriod === "this_week");
  const {
    artists: monthArtists,
    isLoading: monthLoading,
    hasMore: monthHasMore,
    loadMore: loadMoreMonth,
  } = useTopArtistsOnMonth(2024, 11, 10, selectedPeriod === "this_month");
  const {
    artists: yearArtists,
    isLoading: yearLoading,
    hasMore: yearHasMore,
    loadMore: loadMoreYear,
  } = useTopArtistsOnYear(2024, 10, selectedPeriod === "this_year");
  const {
    artists: allTimeArtists,
    isLoading: allTimeLoading,
    hasMore: allTimeHasMore,
    loadMore: loadMoreAllTime,
  } = useTopArtistsOnLifetime(10, selectedPeriod === "all_time");

  const periodDataMap = {
    today: {
      artists: todayArtists,
      isLoading: todayLoading,
      hasMore: todayHasMore,
      loadMore: loadMoreToday,
    },
    this_week: {
      artists: weekArtists,
      isLoading: weekLoading,
      hasMore: weekHasMore,
      loadMore: loadMoreWeek,
    },
    this_month: {
      artists: monthArtists,
      isLoading: monthLoading,
      hasMore: monthHasMore,
      loadMore: loadMoreMonth,
    },
    this_year: {
      artists: yearArtists,
      isLoading: yearLoading,
      hasMore: yearHasMore,
      loadMore: loadMoreYear,
    },
    all_time: {
      artists: allTimeArtists,
      isLoading: allTimeLoading,
      hasMore: allTimeHasMore,
      loadMore: loadMoreAllTime,
    },
  };

  const { artists, isLoading, hasMore, loadMore } =
    periodDataMap[selectedPeriod as PeriodKey];

  const formattedArtists = artists.map((artist) => ({
    ...artist,
    total_duration: secondsToString(artist.total_duration),
  }));

  const columns = [
    { key: "rank", label: "Rank" },
    { key: "artist_name", label: "Artist Name" },
    { key: "total_duration", label: "Total Duration" },
  ];

  return (
    <>
      <div className="h-[calc(100vh-106px)]">
        <div className="w-full h-[10%] flex items-center justify-between bg-primary-700 p-4">
          <p className="text-foreground">Most Listened Artists</p>
          <PeriodDropdown
            items={dropdownItems}
            onSelectionChange={(key) => setSelectedPeriod(key as PeriodKey)}
          />
        </div>
        <Divider />
        <div className="w-full h-[90%] flex items-center justify-center bg-primary-700 p-4">
          <RecordTable
            columns={columns}
            data={formattedArtists}
            hasMore={hasMore}
            isLoading={isLoading}
            title={"Top Artists"}
            onLoadMore={loadMore}
          />
        </div>
      </div>
    </>
  );
}
