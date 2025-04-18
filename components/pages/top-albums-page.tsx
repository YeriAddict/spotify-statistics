"use client";

import { Divider } from "@heroui/react";
import { useState } from "react";

import PeriodDropdown from "../dropdowns/period-dropdown";
import { RecordTable } from "../tables/record-table";

import { secondsToString } from "@/utils/time-processing";
import {
  useTopAlbumsOnDate,
  useTopAlbumsOnLifetime,
  useTopAlbumsOnMonth,
  useTopAlbumsOnWeek,
  useTopAlbumsOnYear,
} from "@/hooks/useTopAlbums";
import { getCurrentDateInfo } from "@/utils/date-utils";

export default function TopAlbumsPageComponent() {
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

  const { year, month, formattedDate } = getCurrentDateInfo();

  const {
    albums: todayAlbums,
    isLoading: todayLoading,
    hasMore: todayHasMore,
    loadMore: loadMoreToday,
  } = useTopAlbumsOnDate(formattedDate, 10, selectedPeriod === "today");
  const {
    albums: weekAlbums,
    isLoading: weekLoading,
    hasMore: weekHasMore,
    loadMore: loadMoreWeek,
  } = useTopAlbumsOnWeek(formattedDate, 10, selectedPeriod === "this_week");
  const {
    albums: monthAlbums,
    isLoading: monthLoading,
    hasMore: monthHasMore,
    loadMore: loadMoreMonth,
  } = useTopAlbumsOnMonth(year, month, 10, selectedPeriod === "this_month");
  const {
    albums: yearAlbums,
    isLoading: yearLoading,
    hasMore: yearHasMore,
    loadMore: loadMoreYear,
  } = useTopAlbumsOnYear(year, 10, selectedPeriod === "this_year");
  const {
    albums: allTimeAlbums,
    isLoading: allTimeLoading,
    hasMore: allTimeHasMore,
    loadMore: loadMoreAllTime,
  } = useTopAlbumsOnLifetime(10, selectedPeriod === "all_time");

  const periodDataMap = {
    today: {
      albums: todayAlbums,
      isLoading: todayLoading,
      hasMore: todayHasMore,
      loadMore: loadMoreToday,
    },
    this_week: {
      albums: weekAlbums,
      isLoading: weekLoading,
      hasMore: weekHasMore,
      loadMore: loadMoreWeek,
    },
    this_month: {
      albums: monthAlbums,
      isLoading: monthLoading,
      hasMore: monthHasMore,
      loadMore: loadMoreMonth,
    },
    this_year: {
      albums: yearAlbums,
      isLoading: yearLoading,
      hasMore: yearHasMore,
      loadMore: loadMoreYear,
    },
    all_time: {
      albums: allTimeAlbums,
      isLoading: allTimeLoading,
      hasMore: allTimeHasMore,
      loadMore: loadMoreAllTime,
    },
  };

  const { albums, isLoading, hasMore, loadMore } =
    periodDataMap[selectedPeriod as PeriodKey];

  const formattedAlbums = albums.map((album) => ({
    ...album,
    total_duration: secondsToString(album.total_duration),
  }));

  const columns = [
    { key: "rank", label: "Rank" },
    { key: "album_name", label: "Album Name" },
    { key: "artist_name", label: "Artist Name" },
    { key: "total_duration", label: "Total Duration" },
  ];

  return (
    <>
      <div className="h-[calc(100vh-106px)]">
        <div className="w-full h-[10%] flex items-center justify-between bg-primary-700 p-4">
          <p className="text-foreground">Most Listened Albums</p>
          <PeriodDropdown
            items={dropdownItems}
            onSelectionChange={(key) => setSelectedPeriod(key as PeriodKey)}
          />
        </div>
        <Divider />
        <div className="w-full h-[90%] flex items-center justify-center bg-primary-700 p-4">
          <RecordTable
            columns={columns}
            data={formattedAlbums}
            hasMore={hasMore}
            isLoading={isLoading}
            title={"Top Albums"}
            onLoadMore={loadMore}
          />
        </div>
      </div>
    </>
  );
}
