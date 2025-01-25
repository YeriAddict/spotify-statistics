"use client";

import { Divider } from "@heroui/react";
import { useState } from "react";

import PeriodDropdown from "../dropdowns/period-dropdown";
import { RecordTable } from "../tables/record-table";

import { useTopTracks } from "@/hooks/useTopTracks";
import { secondsToString } from "@/utils/time-processing";
import { useTopTracksOnDate } from "@/hooks/onDate/useTopTracksOnDate";
import { useTopTracksOnWeek } from "@/hooks/onWeek/useTopTracksOnWeek";
import { useTopTracksOnMonth } from "@/hooks/onMonth/useTopTracksOnMonth";
import { useTopTracksOnYear } from "@/hooks/onYear/useTopTracksOnYear";

export default function TopSongsPageComponent() {
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
    tracks: todayTracks,
    isLoading: todayLoading,
    hasMore: todayHasMore,
    loadMore: loadMoreToday,
  } = useTopTracksOnDate("2024-11-25", 10);
  const {
    tracks: weekTracks,
    isLoading: weekLoading,
    hasMore: weekHasMore,
    loadMore: loadMoreWeek,
  } = useTopTracksOnWeek("2024-11-25", 10);
  const {
    tracks: monthTracks,
    isLoading: monthLoading,
    hasMore: monthHasMore,
    loadMore: loadMoreMonth,
  } = useTopTracksOnMonth(2024, 11, 10);
  const {
    tracks: yearTracks,
    isLoading: yearLoading,
    hasMore: yearHasMore,
    loadMore: loadMoreYear,
  } = useTopTracksOnYear(2024, 10);
  const {
    tracks: allTimeTracks,
    isLoading: allTimeLoading,
    hasMore: allTimeHasMore,
    loadMore: loadMoreAllTime,
  } = useTopTracks(10);

  const periodDataMap = {
    today: {
      tracks: todayTracks,
      isLoading: todayLoading,
      hasMore: todayHasMore,
      loadMore: loadMoreToday,
    },
    this_week: {
      tracks: weekTracks,
      isLoading: weekLoading,
      hasMore: weekHasMore,
      loadMore: loadMoreWeek,
    },
    this_month: {
      tracks: monthTracks,
      isLoading: monthLoading,
      hasMore: monthHasMore,
      loadMore: loadMoreMonth,
    },
    this_year: {
      tracks: yearTracks,
      isLoading: yearLoading,
      hasMore: yearHasMore,
      loadMore: loadMoreYear,
    },
    all_time: {
      tracks: allTimeTracks,
      isLoading: allTimeLoading,
      hasMore: allTimeHasMore,
      loadMore: loadMoreAllTime,
    },
  };

  const { tracks, isLoading, hasMore, loadMore } =
    periodDataMap[selectedPeriod as PeriodKey];

  const formattedTracks = tracks.map((track) => ({
    ...track,
    total_duration: secondsToString(track.total_duration),
  }));

  const columns = [
    { key: "rank", label: "Rank" },
    { key: "track_name", label: "Track Name" },
    { key: "artist_name", label: "Artist Name" },
    { key: "album_name", label: "Album Name" },
    { key: "total_duration", label: "Total Duration" },
  ];

  return (
    <>
      <div className="h-[calc(100vh-106px)]">
        <div className="w-full h-[10%] flex items-center justify-between bg-primary-700 p-4">
          <p className="text-foreground">Most Listened Songs</p>
          <PeriodDropdown
            items={dropdownItems}
            onSelectionChange={(key) => setSelectedPeriod(key as PeriodKey)}
          />
        </div>
        <Divider />
        <div className="w-full h-[90%] flex items-center justify-center bg-primary-700 p-4">
          <RecordTable
            columns={columns}
            data={formattedTracks}
            hasMore={hasMore}
            isLoading={isLoading}
            title={"Top Tracks"}
            onLoadMore={loadMore}
          />
        </div>
      </div>
    </>
  );
}
