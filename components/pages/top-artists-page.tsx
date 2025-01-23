"use client";

import { Divider } from "@heroui/react";

import PeriodDropdown from "../dropdowns/period-dropdown";
import { RecordTable } from "../tables/record-table";

import { useTopArtists } from "@/hooks/useTopArtists";

export default function TopArtistsPageComponent() {
  const dropdownItems = [
    { key: "today", label: "Today" },
    { key: "this_week", label: "This Week" },
    { key: "this_month", label: "This Month" },
    { key: "this_year", label: "This Year" },
    { key: "all_time", label: "All Time" },
  ];

  const { artists, isLoading, hasMore, loadMore } = useTopArtists(10);

  const columns = [
    { key: "rank", label: "Rank" },
    { key: "artist_name", label: "Artist Name" },
    { key: "total_duration", label: "Total Duration (ms)" },
  ];

  return (
    <>
      <div className="h-[calc(100vh-106px)]">
        <div className="w-full h-[10%] flex items-center justify-between bg-primary-700 p-4">
          <p className="text-foreground">Most Listened Artists</p>
          <PeriodDropdown items={dropdownItems} />
        </div>
        <Divider />
        <div className="w-full h-[90%] flex items-center justify-center bg-primary-700 p-4">
          <RecordTable
            columns={columns}
            data={artists}
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
