"use client";

import { Divider } from "@heroui/react";

import PeriodDropdown from "../dropdowns/period-dropdown";
import { RecordTable } from "../tables/record-table";

import { useTopTracks } from "@/hooks/useTopTracks";

export default function TopSongsPageComponent() {
  const { tracks, isLoading, hasMore, loadMore } = useTopTracks(10);

  const columns = [
    { key: "rank", label: "Rank" },
    { key: "track_name", label: "Track Name" },
    { key: "artist_name", label: "Artist Name" },
    { key: "album_name", label: "Album Name" },
    { key: "total_duration", label: "Total Duration (ms)" },
  ];

  return (
    <>
      <div className="h-[calc(100vh-106px)]">
        <div className="w-full h-[10%] flex items-center justify-between bg-primary-700 p-4">
          <p className="text-foreground">Most Listened Songs</p>
          <PeriodDropdown />
        </div>
        <Divider />
        <div className="w-full h-[90%] flex items-center justify-center bg-primary-700 p-4">
          <RecordTable
            columns={columns}
            data={tracks}
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
