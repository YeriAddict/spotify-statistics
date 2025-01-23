"use client";

import { Divider } from "@heroui/react";

import PeriodDropdown from "../dropdowns/period-dropdown";
import { RecordTable } from "../tables/record-table";

import { useTopAlbums } from "@/hooks/useTopAlbums";

export default function TopAlbumsPageComponent() {
  const dropdownItems = [
    { key: "today", label: "Today" },
    { key: "this_week", label: "This Week" },
    { key: "this_month", label: "This Month" },
    { key: "this_year", label: "This Year" },
    { key: "all_time", label: "All Time" },
  ];

  const { albums, isLoading, hasMore, loadMore } = useTopAlbums(10);

  const columns = [
    { key: "rank", label: "Rank" },
    { key: "album_name", label: "Album Name" },
    { key: "artist_name", label: "Artist Name" },
    { key: "total_duration", label: "Total Duration (ms)" },
  ];

  return (
    <>
      <div className="h-[calc(100vh-106px)]">
        <div className="w-full h-[10%] flex items-center justify-between bg-primary-700 p-4">
          <p className="text-foreground">Most Listened Albums</p>
          <PeriodDropdown items={dropdownItems} />
        </div>
        <Divider />
        <div className="w-full h-[90%] flex items-center justify-center bg-primary-700 p-4">
          <RecordTable
            columns={columns}
            data={albums}
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
