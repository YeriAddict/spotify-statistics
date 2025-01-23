"use client";

import { Divider } from "@heroui/react";

import { ActivityCountCard } from "../cards/activity-count-card";
import { ActivityTopCard } from "../cards/activity-top-card";
import { ActivityRecentTracksCard } from "../cards/activity-recent-card";
import { ActivityBreakdownCard } from "../cards/activity-breakdown-card";
import BreakdownBarChart from "../charts/breakdown-barchart";

import { useRecentTracks } from "@/hooks/useRecentTracks";
import { useTracksOnDate } from "@/hooks/onDate/useTracksOnDate";
import { useArtistsOnDate } from "@/hooks/onDate/useArtistsOnDate";
import { useTotalDurationOnDate } from "@/hooks/onDate/useTotalDurationOnDate";
import { useTopTrackOnDate } from "@/hooks/onDate/useTopTrackOnDate";
import { useTopArtistOnDate } from "@/hooks/onDate/useTopArtistOnDate";
import { secondsToString } from "@/utils/string-operations";
import { useHourlyListeningOnDate } from "@/hooks/onDate/useHourlyListeningOnDate";

export default function ActivityPageComponent() {
  const {
    hourlyListening: currentHourlyListening,
    isLoading: isCurrentHourlyListeningLoading,
  } = useHourlyListeningOnDate("2024-11-25");
  const currentHourlyListeningData = currentHourlyListening.map(
    (seconds, hour) => ({
      hour: `${hour}:00`,
      duration: Number((seconds / 60).toFixed(2)),
    }),
  );
  const {
    hourlyListening: prevHourlyListening,
    isLoading: isPrevHourlyListeningLoading,
  } = useHourlyListeningOnDate("2024-11-24");
  const prevHourlyListeningData = prevHourlyListening.map((seconds, hour) => ({
    hour: `${hour}:00`,
    duration: Number((seconds / 60).toFixed(2)),
  }));

  const {
    trackCount: currentTrackCount,
    isLoading: isCurrentTrackCountLoading,
  } = useTracksOnDate("2024-11-25");
  const { trackCount: prevTrackCount, isLoading: isPrevTrackCountLoading } =
    useTracksOnDate("2024-11-24");

  const {
    artistCount: currentArtistCount,
    isLoading: isCurrentArtistCountLoading,
  } = useArtistsOnDate("2024-11-25");
  const { artistCount: prevArtistCount, isLoading: isPrevArtistCountLoading } =
    useArtistsOnDate("2024-11-24");

  const {
    totalDuration: currentTotalDuration,
    isLoading: isCurrentTotalDurationLoading,
  } = useTotalDurationOnDate("2024-11-25");
  const {
    totalDuration: prevTotalDuration,
    isLoading: isPrevTotalDurationLoading,
  } = useTotalDurationOnDate("2024-11-24");

  const { topArtist: currentTopArtist, isLoading: isCurrentTopArtistLoading } =
    useTopArtistOnDate("2024-11-25");
  const { topArtist: prevTopArtist, isLoading: isPrevTopArtistLoading } =
    useTopArtistOnDate("2024-11-24");

  const { topTrack: currentTopTrack, isLoading: isCurrentTopTrackLoading } =
    useTopTrackOnDate("2024-11-25");
  const { topTrack: prevTopTrack, isLoading: isPrevTopTrackLoading } =
    useTopTrackOnDate("2024-11-24");

  const { recentTracks, isLoading, hasMore, loadMore } = useRecentTracks();
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
              <ActivityCountCard
                currentValue={currentTotalDuration}
                isLoading={
                  isCurrentTotalDurationLoading || isPrevTotalDurationLoading
                }
                previousValue={prevTotalDuration}
                title="Time listened"
              />
              <ActivityCountCard
                currentValue={currentTrackCount}
                isLoading={
                  isCurrentTrackCountLoading || isPrevTrackCountLoading
                }
                previousValue={prevTrackCount}
                title="Songs listened"
              />
              <ActivityCountCard
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
                <ActivityBreakdownCard
                  tabs={[
                    {
                      key: "today",
                      title: "Today",
                      isLoading: isCurrentHourlyListeningLoading,
                      content: (
                        <div className="w-full h-[350px] pt-6">
                          <BreakdownBarChart
                            data={currentHourlyListeningData}
                          />
                          ;
                        </div>
                      ),
                    },
                    {
                      key: "yesterday",
                      title: "Yesterday",
                      isLoading: isPrevHourlyListeningLoading,
                      content: (
                        <div className="w-full h-[350px] pt-6">
                          <BreakdownBarChart data={prevHourlyListeningData} />;
                        </div>
                      ),
                    },
                  ]}
                  title="Listening Breakdown"
                />
              </div>

              <div className="flex flex-col flex-[1] gap-y-4">
                <ActivityTopCard
                  tabs={[
                    {
                      key: "today",
                      title: "Today",
                      isLoading: isCurrentTopArtistLoading,
                      content: currentTopArtist ? (
                        <ul className="list-disc">
                          <li>
                            <strong>Artist:</strong>{" "}
                            {currentTopArtist.artist_name}
                          </li>
                          <li>
                            <strong>Total Duration:</strong>{" "}
                            {secondsToString(currentTopArtist.total_duration)}
                          </li>
                        </ul>
                      ) : (
                        <p>No top artist available</p>
                      ),
                    },
                    {
                      key: "yesterday",
                      title: "Yesterday",
                      isLoading: isPrevTopArtistLoading,
                      content: prevTopArtist ? (
                        <ul className="list-disc">
                          <li>
                            <strong>Artist:</strong> {prevTopArtist.artist_name}
                          </li>
                          <li>
                            <strong>Total Duration:</strong>{" "}
                            {secondsToString(prevTopArtist.total_duration)}
                          </li>
                        </ul>
                      ) : (
                        <p>No top artist available</p>
                      ),
                    },
                  ]}
                  title="Most Listened Artist"
                />
                <ActivityTopCard
                  tabs={[
                    {
                      key: "today",
                      title: "Today",
                      isLoading: isCurrentTopTrackLoading,
                      content: currentTopTrack ? (
                        <ul className="list-disc">
                          <li>
                            <strong>Track Name:</strong>{" "}
                            {currentTopTrack.track_name}
                          </li>
                          <li>
                            <strong>Artist:</strong>{" "}
                            {currentTopTrack.artist_name}
                          </li>
                          <li>
                            <strong>Album:</strong> {currentTopTrack.album_name}
                          </li>
                          <li>
                            <strong>Total Duration:</strong>{" "}
                            {secondsToString(currentTopTrack.total_duration)}
                          </li>
                        </ul>
                      ) : (
                        <p>No top track available</p>
                      ),
                    },
                    {
                      key: "yesterday",
                      title: "Yesterday",
                      isLoading: isPrevTopTrackLoading,
                      content: prevTopTrack ? (
                        <ul className="list-disc">
                          <li>
                            <strong>Track Name:</strong>{" "}
                            {prevTopTrack.track_name}
                          </li>
                          <li>
                            <strong>Artist:</strong> {prevTopTrack.artist_name}
                          </li>
                          <li>
                            <strong>Album:</strong> {prevTopTrack.album_name}
                          </li>
                          <li>
                            <strong>Total Duration:</strong>{" "}
                            {secondsToString(prevTopTrack.total_duration)}
                          </li>
                        </ul>
                      ) : (
                        <p>No top track available</p>
                      ),
                    },
                  ]}
                  title="Most Listened Track"
                />
              </div>

              <div className="flex flex-col flex-[1]">
                <ActivityRecentTracksCard
                  columns={recentTracksColumns}
                  data={recentTracks}
                  hasMore={hasMore}
                  isLoading={isLoading}
                  onLoadMore={loadMore}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
