"use client";

import { Card, CardBody, CardHeader, Divider } from "@heroui/react";

import { RecentTracksTable } from "../tables/recent-tracks-table";
import { TodayCountCard } from "../cards/today-count-card";

import { useRecentTracks } from "@/hooks/useRecentTracks";
import { useTracksOnDate } from "@/hooks/useTracksOnDate";
import { useArtistsOnDate } from "@/hooks/useArtistsOnDate";
import { useTotalDurationOnDate } from "@/hooks/useTotalDurationOnDate";

export default function ActivityPageComponent() {
  const { recentTracks, isLoading, hasMore, loadMore } = useRecentTracks();

  const {
    trackCount: currentTrackCount,
    isLoading: isCurrentTrackCountLoading,
  } = useTracksOnDate("2024-11-23");
  const {
    artistCount: currentArtistCount,
    isLoading: isCurrentArtistCountLoading,
  } = useArtistsOnDate("2024-11-23");
  const {
    totalDuration: currentTotalDuration,
    isLoading: isCurrentTotalDurationLoading,
  } = useTotalDurationOnDate("2024-11-23");

  const { trackCount: prevTrackCount, isLoading: isPrevTrackCountLoading } =
    useTracksOnDate("2024-11-22");
  const { artistCount: prevArtistCount, isLoading: isPrevArtistCountLoading } =
    useArtistsOnDate("2024-11-22");
  const {
    totalDuration: prevTotalDuration,
    isLoading: isPrevTotalDurationLoading,
  } = useTotalDurationOnDate("2024-11-22");

  const recentTracksColumns = [
    { key: "timestamp", label: "Timestamp" },
    { key: "track_name", label: "Track Name" },
    { key: "artist_name", label: "Artist Name" },
  ];

  return (
    <>
      <div className="h-[calc(100vh-106px)]">
        <div className="w-full h-[10%] flex items-center justify-between bg-primary-700 p-4">
          <p className="text-foreground">Recent Activity</p>
        </div>
        <Divider />

        <div className="w-full h-[90%] flex items-center justify-center bg-primary-700 p-4">
          <div className="h-full w-full flex flex-col bg-primary-700">
            <div className="w-full h-[25%] flex flex-row gap-4 p-2">
              <TodayCountCard
                currentValue={currentTotalDuration}
                isLoading={
                  isCurrentTotalDurationLoading || isPrevTotalDurationLoading
                }
                previousValue={prevTotalDuration}
                title="Time listened"
              />
              <TodayCountCard
                currentValue={currentTrackCount}
                isLoading={
                  isCurrentTrackCountLoading || isPrevTrackCountLoading
                }
                previousValue={prevTrackCount}
                title="Songs listened"
              />
              <TodayCountCard
                currentValue={currentArtistCount}
                isLoading={
                  isCurrentArtistCountLoading || isPrevArtistCountLoading
                }
                previousValue={prevArtistCount}
                title="Artists listened"
              />
            </div>

            <div className="w-full h-[75%] flex flex-row gap-4 p-2">
              <div className="flex flex-col flex-[2] gap-y-4">
                <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
                  <CardHeader className="flex bg-primary-700">
                    <p className="font-semibold">Songs listened</p>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>Additional insights here</p>
                  </CardBody>
                </Card>
                <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
                  <CardHeader className="flex bg-primary-700">
                    <p className="font-semibold">Songs listened</p>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>Additional insights here</p>
                  </CardBody>
                </Card>
              </div>

              <div className="flex flex-col flex-[1] gap-y-4">
                <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
                  <CardHeader className="flex bg-primary-700">
                    <p className="font-semibold">Most listened artist</p>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>Artist details here</p>
                  </CardBody>
                </Card>
                <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
                  <CardHeader className="flex bg-primary-700">
                    <p className="font-semibold">Most listened song</p>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>Song details here</p>
                  </CardBody>
                </Card>
              </div>

              <div className="flex flex-col flex-[1]">
                <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
                  <CardHeader className="flex bg-primary-700">
                    <p className="font-semibold">Last songs listened</p>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <RecentTracksTable
                      columns={recentTracksColumns}
                      data={recentTracks}
                      hasMore={hasMore}
                      isLoading={isLoading}
                      title="Last Songs Listened"
                      onLoadMore={loadMore}
                    />
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
