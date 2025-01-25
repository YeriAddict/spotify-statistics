"use client";

import { Divider } from "@heroui/react";
import { useState } from "react";

import PeriodDropdown from "../dropdowns/period-dropdown";
import { RecordTable } from "../tables/record-table";

import { useTopAlbums } from "@/hooks/useTopAlbums";
import { useTopAlbumsOnDate } from "@/hooks/onDate/useTopAlbumsOnDate";
import { useTopAlbumsOnWeek } from "@/hooks/onWeek/useTopAlbumsOnWeek";
import { useTopAlbumsOnMonth } from "@/hooks/onMonth/useTopAlbumsOnMonth";
import { useTopAlbumsOnYear } from "@/hooks/onYear/useTopAlbumsOnYear";
import { secondsToString } from "@/utils/time-processing";

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

  const {
    albums: todayAlbums,
    isLoading: todayLoading,
    hasMore: todayHasMore,
    loadMore: loadMoreToday,
  } = useTopAlbumsOnDate("2024-11-25", 10);
  const {
    albums: weekAlbums,
    isLoading: weekLoading,
    hasMore: weekHasMore,
    loadMore: loadMoreWeek,
  } = useTopAlbumsOnWeek("2024-11-25", 10);
  const {
    albums: monthAlbums,
    isLoading: monthLoading,
    hasMore: monthHasMore,
    loadMore: loadMoreMonth,
  } = useTopAlbumsOnMonth(2024, 11, 10);
  const {
    albums: yearAlbums,
    isLoading: yearLoading,
    hasMore: yearHasMore,
    loadMore: loadMoreYear,
  } = useTopAlbumsOnYear(2024, 10);
  const {
    albums: allTimeAlbums,
    isLoading: allTimeLoading,
    hasMore: allTimeHasMore,
    loadMore: loadMoreAllTime,
  } = useTopAlbums(10);

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
