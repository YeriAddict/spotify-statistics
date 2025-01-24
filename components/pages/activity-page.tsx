"use client";

import { Divider } from "@heroui/react";
import { useState } from "react";

import { ActivityCountCard } from "../cards/activity-count-card";
import { ActivityTopCard } from "../cards/activity-top-card";
import { ActivityRecentTracksCard } from "../cards/activity-recent-card";
import { ActivityBreakdownCard } from "../cards/activity-breakdown-card";
import BreakdownBarChart from "../charts/breakdown-barchart";
import PeriodDropdown from "../dropdowns/period-dropdown";

import { useRecentTracks } from "@/hooks/useRecentTracks";
import { useTracksOnDate } from "@/hooks/onDate/useTracksOnDate";
import { useArtistsOnDate } from "@/hooks/onDate/useArtistsOnDate";
import { useTotalDurationOnDate } from "@/hooks/onDate/useTotalDurationOnDate";
import { useTopTrackOnDate } from "@/hooks/onDate/useTopTrackOnDate";
import { useTopArtistOnDate } from "@/hooks/onDate/useTopArtistOnDate";
import { secondsToString } from "@/utils/time-processing";
import { useListeningBreakdownOnDate } from "@/hooks/onDate/useListeningBreakdownOnDate";
import { useListeningBreakdownOnWeek } from "@/hooks/onWeek/useListeningBreakdownOnWeek";
import { useListeningBreakdownOnMonth } from "@/hooks/onMonth/useListeningBreakdownOnMonth";
import { useListeningBreakdownOnYear } from "@/hooks/onYear/useListeningBreakdownOnYear";
import { useTracksOnYear } from "@/hooks/onYear/useTracksOnYear";
import { useArtistsOnYear } from "@/hooks/onYear/useArtistsOnYear";
import { useTotalDurationOnYear } from "@/hooks/onYear/useTotalDurationOnYear";
import { useTopTrackOnYear } from "@/hooks/onYear/useTopTrackOnYear";
import { useTopArtistOnYear } from "@/hooks/onYear/useTopArtistOnYear";
import { useTracksOnMonth } from "@/hooks/onMonth/useTracksOnMonth";
import { useArtistsOnMonth } from "@/hooks/onMonth/useArtistsOnMonth";
import { useTotalDurationOnMonth } from "@/hooks/onMonth/useTotalDurationOnMonth";
import { useTopTrackOnMonth } from "@/hooks/onMonth/useTopTrackOnMonth";
import { useTopArtistOnMonth } from "@/hooks/onMonth/useTopArtistOnMonth";
import { useTracksOnWeek } from "@/hooks/onWeek/useTracksOnWeek";
import { useTotalDurationOnWeek } from "@/hooks/onWeek/useTotalDurationOnWeek";
import { useTopTrackOnWeek } from "@/hooks/onWeek/useTopTrackOnWeek";
import { useTopArtistOnWeek } from "@/hooks/onWeek/useTopArtistOnWeek";
import { useArtistsOnWeek } from "@/hooks/onWeek/useArtistsOnWeek";
import {
  processHourlyListening,
  processMonthlyListening,
  processWeeklyListening,
  processYearlyListening,
} from "@/utils/chart-data-processing";
import { generateListeningBreakdownXTicks } from "@/utils/chart-utils";

export default function ActivityPageComponent() {
  const dropdownItems = [
    { key: "today", label: "Today" },
    { key: "last_week", label: "This Week" },
    { key: "last_month", label: "This Month" },
    { key: "last_year", label: "This Year" },
  ];
  const [selectedPeriod, setSelectedPeriod] = useState<string>("today");

  const dataSources = {
    current: {
      day: {
        hourlyListening: useListeningBreakdownOnDate("2024-11-25"),
        trackCount: useTracksOnDate("2024-11-25"),
        artistCount: useArtistsOnDate("2024-11-25"),
        totalDuration: useTotalDurationOnDate("2024-11-25"),
        topTrack: useTopTrackOnDate("2024-11-25"),
        topArtist: useTopArtistOnDate("2024-11-25"),
      },
      week: {
        weeklyListening: useListeningBreakdownOnWeek("2024-11-25"),
        trackCount: useTracksOnWeek("2024-11-25"),
        artistCount: useArtistsOnWeek("2024-11-25"),
        totalDuration: useTotalDurationOnWeek("2024-11-25"),
        topTrack: useTopTrackOnWeek("2024-11-25"),
        topArtist: useTopArtistOnWeek("2024-11-25"),
      },
      month: {
        monthlyListening: useListeningBreakdownOnMonth(2024, 11),
        trackCount: useTracksOnMonth(2024, 11),
        artistCount: useArtistsOnMonth(2024, 11),
        totalDuration: useTotalDurationOnMonth(2024, 11),
        topTrack: useTopTrackOnMonth(2024, 11),
        topArtist: useTopArtistOnMonth(2024, 11),
      },
      year: {
        yearlyListening: useListeningBreakdownOnYear(2024),
        trackCount: useTracksOnYear(2024),
        artistCount: useArtistsOnYear(2024),
        totalDuration: useTotalDurationOnYear(2024),
        topTrack: useTopTrackOnYear(2024),
        topArtist: useTopArtistOnYear(2024),
      },
    },
    previous: {
      day: {
        hourlyListening: useListeningBreakdownOnDate("2024-11-24"),
        trackCount: useTracksOnDate("2024-11-24"),
        artistCount: useArtistsOnDate("2024-11-24"),
        totalDuration: useTotalDurationOnDate("2024-11-24"),
        topTrack: useTopTrackOnDate("2024-11-24"),
        topArtist: useTopArtistOnDate("2024-11-24"),
      },
      week: {
        weeklyListening: useListeningBreakdownOnWeek("2024-11-24"),
        trackCount: useTracksOnWeek("2024-11-24"),
        artistCount: useArtistsOnWeek("2024-11-24"),
        totalDuration: useTotalDurationOnWeek("2024-11-24"),
        topTrack: useTopTrackOnWeek("2024-11-24"),
        topArtist: useTopArtistOnWeek("2024-11-24"),
      },
      month: {
        monthlyListening: useListeningBreakdownOnMonth(2024, 10),
        trackCount: useTracksOnMonth(2024, 10),
        artistCount: useArtistsOnMonth(2024, 10),
        totalDuration: useTotalDurationOnMonth(2024, 10),
        topTrack: useTopTrackOnMonth(2024, 10),
        topArtist: useTopArtistOnMonth(2024, 10),
      },
      year: {
        yearlyListening: useListeningBreakdownOnYear(2023),
        trackCount: useTracksOnYear(2023),
        artistCount: useArtistsOnYear(2023),
        totalDuration: useTotalDurationOnYear(2023),
        topTrack: useTopTrackOnYear(2023),
        topArtist: useTopArtistOnYear(2023),
      },
    },
  };

  const currentListeningBreakdownData = {
    day: processHourlyListening(
      dataSources.current.day.hourlyListening?.hourlyListening,
    ),
    week: processWeeklyListening(
      dataSources.current.week.weeklyListening?.weeklyListening,
    ),
    month: processMonthlyListening(
      dataSources.current.month.monthlyListening?.monthlyListening,
    ),
    year: processYearlyListening(
      dataSources.current.year.yearlyListening?.yearlyListening,
    ),
  };

  const prevListeningBreakdownData = {
    day: processHourlyListening(
      dataSources.previous.day.hourlyListening?.hourlyListening,
    ),
    week: processWeeklyListening(
      dataSources.previous.week.weeklyListening?.weeklyListening,
    ),
    month: processMonthlyListening(
      dataSources.previous.month.monthlyListening?.monthlyListening,
    ),
    year: processYearlyListening(
      dataSources.previous.year.yearlyListening?.yearlyListening,
    ),
  };

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
          <PeriodDropdown
            items={dropdownItems}
            onSelectionChange={(key) => setSelectedPeriod(key)}
          />
        </div>
        <Divider />

        <div className="w-full h-[90%] flex items-center justify-center bg-primary-700 p-4">
          <div className="h-full w-full flex flex-col bg-primary-700">
            <div className="w-full h-[25%] flex flex-row gap-4 p-2">
              {/* Time Listened */}
              {selectedPeriod === "today" && (
                <ActivityCountCard
                  currentValue={
                    dataSources.current.day.totalDuration.totalDuration
                  }
                  isLoading={
                    dataSources.current.day.totalDuration.isLoading ||
                    dataSources.previous.day.totalDuration.isLoading
                  }
                  isNumeric={false}
                  previousValue={
                    dataSources.previous.day.totalDuration.totalDuration
                  }
                  selectedPeriod={selectedPeriod}
                  title="Time listened"
                />
              )}
              {selectedPeriod === "last_week" && (
                <ActivityCountCard
                  currentValue={
                    dataSources.current.week.totalDuration.totalDuration
                  }
                  isLoading={
                    dataSources.current.week.totalDuration.isLoading ||
                    dataSources.previous.week.totalDuration.isLoading
                  }
                  isNumeric={false}
                  previousValue={
                    dataSources.previous.week.totalDuration.totalDuration
                  }
                  selectedPeriod={selectedPeriod}
                  title="Time listened"
                />
              )}
              {selectedPeriod === "last_month" && (
                <ActivityCountCard
                  currentValue={
                    dataSources.current.month.totalDuration.totalDuration
                  }
                  isLoading={
                    dataSources.current.month.totalDuration.isLoading ||
                    dataSources.previous.month.totalDuration.isLoading
                  }
                  isNumeric={false}
                  previousValue={
                    dataSources.previous.month.totalDuration.totalDuration
                  }
                  selectedPeriod={selectedPeriod}
                  title="Time listened"
                />
              )}
              {selectedPeriod === "last_year" && (
                <ActivityCountCard
                  currentValue={
                    dataSources.current.year.totalDuration.totalDuration
                  }
                  isLoading={
                    dataSources.current.year.totalDuration.isLoading ||
                    dataSources.previous.year.totalDuration.isLoading
                  }
                  isNumeric={false}
                  previousValue={
                    dataSources.previous.year.totalDuration.totalDuration
                  }
                  selectedPeriod={selectedPeriod}
                  title="Time listened"
                />
              )}

              {/* Songs Listened */}
              {selectedPeriod === "today" && (
                <ActivityCountCard
                  currentValue={dataSources.current.day.trackCount.trackCount}
                  isLoading={
                    dataSources.current.day.trackCount.isLoading ||
                    dataSources.previous.day.trackCount.isLoading
                  }
                  isNumeric={true}
                  previousValue={dataSources.previous.day.trackCount.trackCount}
                  selectedPeriod={selectedPeriod}
                  title="Songs listened"
                />
              )}
              {selectedPeriod === "last_week" && (
                <ActivityCountCard
                  currentValue={dataSources.current.week.trackCount.trackCount}
                  isLoading={
                    dataSources.current.week.trackCount.isLoading ||
                    dataSources.previous.week.trackCount.isLoading
                  }
                  isNumeric={true}
                  previousValue={
                    dataSources.previous.week.trackCount.trackCount
                  }
                  selectedPeriod={selectedPeriod}
                  title="Songs listened"
                />
              )}
              {selectedPeriod === "last_month" && (
                <ActivityCountCard
                  currentValue={dataSources.current.month.trackCount.trackCount}
                  isLoading={
                    dataSources.current.month.trackCount.isLoading ||
                    dataSources.previous.month.trackCount.isLoading
                  }
                  isNumeric={true}
                  previousValue={
                    dataSources.previous.month.trackCount.trackCount
                  }
                  selectedPeriod={selectedPeriod}
                  title="Songs listened"
                />
              )}
              {selectedPeriod === "last_year" && (
                <ActivityCountCard
                  currentValue={dataSources.current.year.trackCount.trackCount}
                  isLoading={
                    dataSources.current.year.trackCount.isLoading ||
                    dataSources.previous.year.trackCount.isLoading
                  }
                  isNumeric={true}
                  previousValue={
                    dataSources.previous.year.trackCount.trackCount
                  }
                  selectedPeriod={selectedPeriod}
                  title="Songs listened"
                />
              )}

              {/* Artists Listened */}
              {selectedPeriod === "today" && (
                <ActivityCountCard
                  currentValue={dataSources.current.day.artistCount.artistCount}
                  isLoading={
                    dataSources.current.day.artistCount.isLoading ||
                    dataSources.previous.day.artistCount.isLoading
                  }
                  isNumeric={true}
                  previousValue={
                    dataSources.previous.day.artistCount.artistCount
                  }
                  selectedPeriod={selectedPeriod}
                  title="Artists listened"
                />
              )}
              {selectedPeriod === "last_week" && (
                <ActivityCountCard
                  currentValue={
                    dataSources.current.week.artistCount.artistCount
                  }
                  isLoading={
                    dataSources.current.week.artistCount.isLoading ||
                    dataSources.previous.week.artistCount.isLoading
                  }
                  isNumeric={true}
                  previousValue={
                    dataSources.previous.week.artistCount.artistCount
                  }
                  selectedPeriod={selectedPeriod}
                  title="Artists listened"
                />
              )}
              {selectedPeriod === "last_month" && (
                <ActivityCountCard
                  currentValue={
                    dataSources.current.month.artistCount.artistCount
                  }
                  isLoading={
                    dataSources.current.month.artistCount.isLoading ||
                    dataSources.previous.month.artistCount.isLoading
                  }
                  isNumeric={true}
                  previousValue={
                    dataSources.previous.month.artistCount.artistCount
                  }
                  selectedPeriod={selectedPeriod}
                  title="Artists listened"
                />
              )}
              {selectedPeriod === "last_year" && (
                <ActivityCountCard
                  currentValue={
                    dataSources.current.year.artistCount.artistCount
                  }
                  isLoading={
                    dataSources.current.year.artistCount.isLoading ||
                    dataSources.previous.year.artistCount.isLoading
                  }
                  isNumeric={true}
                  previousValue={
                    dataSources.previous.year.artistCount.artistCount
                  }
                  selectedPeriod={selectedPeriod}
                  title="Artists listened"
                />
              )}
            </div>

            <div className="w-full h-[75%] flex flex-row gap-4 p-2">
              <div className="flex flex-col flex-[2] gap-y-4">
                {/* Listening Breakdown */}
                {selectedPeriod === "today" && (
                  <ActivityBreakdownCard
                    tabs={[
                      {
                        key: "today",
                        title: "Today",
                        isLoading:
                          dataSources.current.day.hourlyListening.isLoading,
                        content: (
                          <div className="w-full h-[350px] pt-6">
                            <BreakdownBarChart
                              data={currentListeningBreakdownData.day}
                              xAxisLabel="Hour"
                              xTicks={[
                                "0:00",
                                "6:00",
                                "12:00",
                                "18:00",
                                "23:00",
                              ]}
                              yAxisLabel="Duration"
                            />
                          </div>
                        ),
                      },
                      {
                        key: "yesterday",
                        title: "Yesterday",
                        isLoading:
                          dataSources.previous.day.hourlyListening.isLoading,
                        content: (
                          <div className="w-full h-[350px] pt-6">
                            <BreakdownBarChart
                              data={prevListeningBreakdownData.day}
                              xAxisLabel="Hour"
                              xTicks={[
                                "0:00",
                                "6:00",
                                "12:00",
                                "18:00",
                                "23:00",
                              ]}
                              yAxisLabel="Duration"
                            />
                          </div>
                        ),
                      },
                    ]}
                    title="Listening Breakdown"
                  />
                )}

                {selectedPeriod === "last_week" && (
                  <ActivityBreakdownCard
                    tabs={[
                      {
                        key: "this_week",
                        title: "This Week",
                        isLoading:
                          dataSources.current.week.weeklyListening.isLoading,
                        content: (
                          <div className="w-full h-[350px] pt-6">
                            <BreakdownBarChart
                              data={currentListeningBreakdownData.week}
                              xAxisLabel="Hour"
                              xTicks={[
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                                "Sunday",
                              ]}
                              yAxisLabel="Duration"
                            />
                          </div>
                        ),
                      },
                      {
                        key: "last_week",
                        title: "Last Week",
                        isLoading:
                          dataSources.previous.week.weeklyListening.isLoading,
                        content: (
                          <div className="w-full h-[350px] pt-6">
                            <BreakdownBarChart
                              data={prevListeningBreakdownData.week}
                              xAxisLabel="Day"
                              xTicks={[
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                                "Sunday",
                              ]}
                              yAxisLabel="Duration"
                            />
                          </div>
                        ),
                      },
                    ]}
                    title="Listening Breakdown"
                  />
                )}

                {selectedPeriod === "last_month" && (
                  <ActivityBreakdownCard
                    tabs={[
                      {
                        key: "this_month",
                        title: "This Month",
                        isLoading:
                          dataSources.current.month.monthlyListening.isLoading,
                        content: (
                          <div className="w-full h-[350px] pt-6">
                            <BreakdownBarChart
                              data={currentListeningBreakdownData.month}
                              xAxisLabel="Day"
                              xTicks={generateListeningBreakdownXTicks(
                                currentListeningBreakdownData.month,
                              )}
                              yAxisLabel="Duration"
                            />
                          </div>
                        ),
                      },
                      {
                        key: "last_month",
                        title: "Last Month",
                        isLoading:
                          dataSources.previous.month.monthlyListening.isLoading,
                        content: (
                          <div className="w-full h-[350px] pt-6">
                            <BreakdownBarChart
                              data={prevListeningBreakdownData.month}
                              xAxisLabel="Day"
                              xTicks={generateListeningBreakdownXTicks(
                                prevListeningBreakdownData.month,
                              )}
                              yAxisLabel="Duration"
                            />
                          </div>
                        ),
                      },
                    ]}
                    title="Listening Breakdown"
                  />
                )}

                {selectedPeriod === "last_year" && (
                  <ActivityBreakdownCard
                    tabs={[
                      {
                        key: "this_year",
                        title: "This Year",
                        isLoading:
                          dataSources.current.year.yearlyListening.isLoading,
                        content: (
                          <div className="w-full h-[350px] pt-6">
                            <BreakdownBarChart
                              data={currentListeningBreakdownData.year}
                              xAxisLabel="Month"
                              xTicks={[
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                              ]}
                              yAxisLabel="Duration"
                            />
                          </div>
                        ),
                      },
                      {
                        key: "last_year",
                        title: "Last Year",
                        isLoading:
                          dataSources.previous.year.yearlyListening.isLoading,
                        content: (
                          <div className="w-full h-[350px] pt-6">
                            <BreakdownBarChart
                              data={prevListeningBreakdownData.year}
                              xAxisLabel="Month"
                              xTicks={[
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                              ]}
                              yAxisLabel="Duration"
                            />
                          </div>
                        ),
                      },
                    ]}
                    title="Listening Breakdown"
                  />
                )}
              </div>

              <div className="flex flex-col flex-[1] gap-y-4">
                {/* Most Listened Artist */}
                {selectedPeriod === "today" && (
                  <ActivityTopCard
                    tabs={[
                      {
                        key: "today",
                        title: "Today",
                        isLoading: dataSources.current.day.topArtist.isLoading,
                        content: dataSources.current.day.topArtist.topArtist ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.current.day.topArtist.topArtist
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.current.day.topArtist.topArtist
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top artist available</p>
                        ),
                      },
                      {
                        key: "yesterday",
                        title: "Yesterday",
                        isLoading: dataSources.previous.day.topArtist.isLoading,
                        content: dataSources.previous.day.topArtist
                          .topArtist ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.previous.day.topArtist.topArtist
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.previous.day.topArtist.topArtist
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top artist available</p>
                        ),
                      },
                    ]}
                    title="Most Listened Artist"
                  />
                )}

                {selectedPeriod === "last_week" && (
                  <ActivityTopCard
                    tabs={[
                      {
                        key: "this_week",
                        title: "This Week",
                        isLoading: dataSources.current.week.topArtist.isLoading,
                        content: dataSources.current.week.topArtist
                          .topArtist ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.current.week.topArtist.topArtist
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.current.week.topArtist.topArtist
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top artist available</p>
                        ),
                      },
                      {
                        key: "last_week",
                        title: "Last Week",
                        isLoading:
                          dataSources.previous.week.topArtist.isLoading,
                        content: dataSources.previous.week.topArtist
                          .topArtist ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.previous.week.topArtist.topArtist
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.previous.week.topArtist.topArtist
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top artist available</p>
                        ),
                      },
                    ]}
                    title="Most Listened Artist"
                  />
                )}

                {selectedPeriod === "last_month" && (
                  <ActivityTopCard
                    tabs={[
                      {
                        key: "this_month",
                        title: "This Month",
                        isLoading:
                          dataSources.current.month.topArtist.isLoading,
                        content: dataSources.current.month.topArtist
                          .topArtist ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.current.month.topArtist.topArtist
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.current.month.topArtist.topArtist
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top artist available</p>
                        ),
                      },
                      {
                        key: "last_month",
                        title: "Last Month",
                        isLoading:
                          dataSources.previous.month.topArtist.isLoading,
                        content: dataSources.previous.month.topArtist
                          .topArtist ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.previous.month.topArtist.topArtist
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.previous.month.topArtist.topArtist
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top artist available</p>
                        ),
                      },
                    ]}
                    title="Most Listened Artist"
                  />
                )}

                {selectedPeriod === "last_year" && (
                  <ActivityTopCard
                    tabs={[
                      {
                        key: "this_year",
                        title: "This Year",
                        isLoading: dataSources.current.year.topArtist.isLoading,
                        content: dataSources.current.year.topArtist
                          .topArtist ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.current.year.topArtist.topArtist
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.current.year.topArtist.topArtist
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top artist available</p>
                        ),
                      },
                      {
                        key: "last_year",
                        title: "Last Year",
                        isLoading:
                          dataSources.previous.year.topArtist.isLoading,
                        content: dataSources.previous.year.topArtist
                          .topArtist ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.previous.year.topArtist.topArtist
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.previous.year.topArtist.topArtist
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top artist available</p>
                        ),
                      },
                    ]}
                    title="Most Listened Artist"
                  />
                )}

                {/* Most Listened Track */}
                {selectedPeriod === "today" && (
                  <ActivityTopCard
                    tabs={[
                      {
                        key: "today",
                        title: "Today",
                        isLoading: dataSources.current.day.topTrack.isLoading,
                        content: dataSources.current.day.topTrack.topTrack ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Track Name:</strong>{" "}
                              {
                                dataSources.current.day.topTrack.topTrack
                                  .track_name
                              }
                            </li>
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.current.day.topTrack.topTrack
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Album:</strong>{" "}
                              {
                                dataSources.current.day.topTrack.topTrack
                                  .album_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.current.day.topTrack.topTrack
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top track available</p>
                        ),
                      },
                      {
                        key: "yesterday",
                        title: "Yesterday",
                        isLoading: dataSources.previous.day.topTrack.isLoading,
                        content: dataSources.previous.day.topTrack.topTrack ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Track Name:</strong>{" "}
                              {
                                dataSources.previous.day.topTrack.topTrack
                                  .track_name
                              }
                            </li>
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.previous.day.topTrack.topTrack
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Album:</strong>{" "}
                              {
                                dataSources.previous.day.topTrack.topTrack
                                  .album_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.previous.day.topTrack.topTrack
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top track available</p>
                        ),
                      },
                    ]}
                    title="Most Listened Track"
                  />
                )}

                {selectedPeriod === "last_week" && (
                  <ActivityTopCard
                    tabs={[
                      {
                        key: "this_week",
                        title: "This Week",
                        isLoading: dataSources.current.week.topTrack.isLoading,
                        content: dataSources.current.week.topTrack.topTrack ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Track Name:</strong>{" "}
                              {
                                dataSources.current.week.topTrack.topTrack
                                  .track_name
                              }
                            </li>
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.current.week.topTrack.topTrack
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Album:</strong>{" "}
                              {
                                dataSources.current.week.topTrack.topTrack
                                  .album_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.current.week.topTrack.topTrack
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top track available</p>
                        ),
                      },
                      {
                        key: "last_week",
                        title: "Last Week",
                        isLoading: dataSources.previous.week.topTrack.isLoading,
                        content: dataSources.previous.week.topTrack.topTrack ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Track Name:</strong>{" "}
                              {
                                dataSources.previous.week.topTrack.topTrack
                                  .track_name
                              }
                            </li>
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.previous.week.topTrack.topTrack
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Album:</strong>{" "}
                              {
                                dataSources.previous.week.topTrack.topTrack
                                  .album_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.previous.week.topTrack.topTrack
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top track available</p>
                        ),
                      },
                    ]}
                    title="Most Listened Track"
                  />
                )}

                {selectedPeriod === "last_month" && (
                  <ActivityTopCard
                    tabs={[
                      {
                        key: "this_month",
                        title: "This Month",
                        isLoading: dataSources.current.month.topTrack.isLoading,
                        content: dataSources.current.month.topTrack.topTrack ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Track Name:</strong>{" "}
                              {
                                dataSources.current.month.topTrack.topTrack
                                  .track_name
                              }
                            </li>
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.current.month.topTrack.topTrack
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Album:</strong>{" "}
                              {
                                dataSources.current.month.topTrack.topTrack
                                  .album_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.current.month.topTrack.topTrack
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top track available</p>
                        ),
                      },
                      {
                        key: "last_month",
                        title: "Last Month",
                        isLoading:
                          dataSources.previous.month.topTrack.isLoading,
                        content: dataSources.previous.month.topTrack
                          .topTrack ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Track Name:</strong>{" "}
                              {
                                dataSources.previous.month.topTrack.topTrack
                                  .track_name
                              }
                            </li>
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.previous.month.topTrack.topTrack
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Album:</strong>{" "}
                              {
                                dataSources.previous.month.topTrack.topTrack
                                  .album_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.previous.month.topTrack.topTrack
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top track available</p>
                        ),
                      },
                    ]}
                    title="Most Listened Track"
                  />
                )}

                {selectedPeriod === "last_year" && (
                  <ActivityTopCard
                    tabs={[
                      {
                        key: "this_year",
                        title: "This Year",
                        isLoading: dataSources.current.year.topTrack.isLoading,
                        content: dataSources.current.year.topTrack.topTrack ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Track Name:</strong>{" "}
                              {
                                dataSources.current.year.topTrack.topTrack
                                  .track_name
                              }
                            </li>
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.current.year.topTrack.topTrack
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Album:</strong>{" "}
                              {
                                dataSources.current.year.topTrack.topTrack
                                  .album_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.current.year.topTrack.topTrack
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top track available</p>
                        ),
                      },
                      {
                        key: "last_year",
                        title: "Last Year",
                        isLoading: dataSources.previous.year.topTrack.isLoading,
                        content: dataSources.previous.year.topTrack.topTrack ? (
                          <ul className="list-disc">
                            <li>
                              <strong>Track Name:</strong>{" "}
                              {
                                dataSources.previous.year.topTrack.topTrack
                                  .track_name
                              }
                            </li>
                            <li>
                              <strong>Artist:</strong>{" "}
                              {
                                dataSources.previous.year.topTrack.topTrack
                                  .artist_name
                              }
                            </li>
                            <li>
                              <strong>Album:</strong>{" "}
                              {
                                dataSources.previous.year.topTrack.topTrack
                                  .album_name
                              }
                            </li>
                            <li>
                              <strong>Total Duration:</strong>{" "}
                              {secondsToString(
                                dataSources.previous.year.topTrack.topTrack
                                  .total_duration,
                              )}
                            </li>
                          </ul>
                        ) : (
                          <p>No top track available</p>
                        ),
                      },
                    ]}
                    title="Most Listened Track"
                  />
                )}
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
