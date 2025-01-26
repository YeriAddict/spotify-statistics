"use client";

import { Divider } from "@heroui/react";
import { useState } from "react";

import { ActivityCountCard } from "../cards/activity-count-card";
import { ActivityTopCard } from "../cards/activity-top-card";
import { ActivityRecentTracksCard } from "../cards/activity-recent-card";
import { ActivityBreakdownCard } from "../cards/activity-breakdown-card";
import BreakdownBarChart from "../charts/breakdown-barchart";
import PeriodDropdown from "../dropdowns/period-dropdown";

import {
  processHourlyListening,
  processWeeklyListening,
  processMonthlyListening,
  processYearlyListening,
} from "@/utils/chart-data-processing";
import { generateListeningBreakdownXTicks } from "@/utils/chart-utils";
import { secondsToString } from "@/utils/time-processing";
import {
  useCountTracksOnDate,
  useCountTracksOnMonth,
  useCountTracksOnWeek,
  useCountTracksOnYear,
} from "@/hooks/useCountTracks";
import {
  useCountArtistsOnDate,
  useCountArtistsOnMonth,
  useCountArtistsOnWeek,
  useCountArtistsOnYear,
} from "@/hooks/useCountArtists";
import {
  useTotalDurationOnDate,
  useTotalDurationOnMonth,
  useTotalDurationOnWeek,
  useTotalDurationOnYear,
} from "@/hooks/useTotalDuration";
import {
  useTopTrackOnDate,
  useTopTrackOnMonth,
  useTopTrackOnWeek,
  useTopTrackOnYear,
} from "@/hooks/useTopTrack";
import {
  useTopArtistOnDate,
  useTopArtistOnMonth,
  useTopArtistOnWeek,
  useTopArtistOnYear,
} from "@/hooks/useTopArtist";
import {
  useListeningBreakdownOnDate,
  useListeningBreakdownOnMonth,
  useListeningBreakdownOnWeek,
  useListeningBreakdownOnYear,
} from "@/hooks/useListeningBreakdown";
import { useRecentTracks } from "@/hooks/useRecentTracks";

type PeriodKey = "today" | "last_week" | "last_month" | "last_year";

type PeriodMap = Record<
  PeriodKey,
  {
    current: {
      listeningBreakdown: {
        listeningBreakdown: { label: string; duration: number }[];
        isLoading: boolean;
        chartLabels: {
          xTicks: string[];
          xAxisLabel: string;
        };
      };
      trackCount: {
        trackCount: number;
        isLoading: boolean;
      };
      artistCount: {
        artistCount: number;
        isLoading: boolean;
      };
      totalDuration: {
        totalDuration: number;
        isLoading: boolean;
      };
      topTrack: {
        topTrack: {
          track_name: string;
          artist_name: string;
          album_name: string;
          total_duration: number;
        } | null;
        isLoading: boolean;
      };
      topArtist: {
        topArtist: {
          artist_name: string;
          total_duration: number;
        } | null;
        isLoading: boolean;
      };
      tabLabel: string;
    };
    previous: {
      listeningBreakdown: {
        listeningBreakdown: { label: string; duration: number }[];
        isLoading: boolean;
        chartLabels: {
          xTicks: string[];
          xAxisLabel: string;
        };
      };
      trackCount: {
        trackCount: number;
        isLoading: boolean;
      };
      artistCount: {
        artistCount: number;
        isLoading: boolean;
      };
      totalDuration: {
        totalDuration: number;
        isLoading: boolean;
      };
      topTrack: {
        topTrack: {
          track_name: string;
          artist_name: string;
          album_name: string;
          total_duration: number;
        } | null;
        isLoading: boolean;
      };
      topArtist: {
        topArtist: {
          artist_name: string;
          total_duration: number;
        } | null;
        isLoading: boolean;
      };
      tabLabel: string;
    };
  }
>;

export default function ActivityPageComponent() {
  const dropdownItems = [
    { key: "today", label: "Today" },
    { key: "last_week", label: "This Week" },
    { key: "last_month", label: "This Month" },
    { key: "last_year", label: "This Year" },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>("today");

  const periodMap: PeriodMap = {
    today: {
      current: {
        listeningBreakdown: {
          listeningBreakdown: [],
          isLoading: false,
          chartLabels: {
            xTicks: ["0:00", "6:00", "12:00", "18:00", "23:00"],
            xAxisLabel: "Hour",
          },
        },
        trackCount: useCountTracksOnDate(
          "2024-11-25",
          selectedPeriod === "today",
        ),
        artistCount: useCountArtistsOnDate(
          "2024-11-25",
          selectedPeriod === "today",
        ),
        totalDuration: useTotalDurationOnDate(
          "2024-11-25",
          selectedPeriod === "today",
        ),
        topTrack: useTopTrackOnDate("2024-11-25", selectedPeriod === "today"),
        topArtist: useTopArtistOnDate("2024-11-25", selectedPeriod === "today"),
        tabLabel: "Today",
      },
      previous: {
        listeningBreakdown: {
          listeningBreakdown: [],
          isLoading: false,
          chartLabels: {
            xTicks: ["0:00", "6:00", "12:00", "18:00", "23:00"],
            xAxisLabel: "Hour",
          },
        },
        trackCount: useCountTracksOnDate(
          "2024-11-24",
          selectedPeriod === "today",
        ),
        artistCount: useCountArtistsOnDate(
          "2024-11-24",
          selectedPeriod === "today",
        ),
        totalDuration: useTotalDurationOnDate(
          "2024-11-24",
          selectedPeriod === "today",
        ),
        topTrack: useTopTrackOnDate("2024-11-24", selectedPeriod === "today"),
        topArtist: useTopArtistOnDate("2024-11-24", selectedPeriod === "today"),
        tabLabel: "Yesterday",
      },
    },
    last_week: {
      current: {
        listeningBreakdown: {
          listeningBreakdown: [],
          isLoading: false,
          chartLabels: {
            xTicks: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            xAxisLabel: "Day",
          },
        },
        trackCount: useCountTracksOnWeek(
          "2024-11-25",
          selectedPeriod === "last_week",
        ),
        artistCount: useCountArtistsOnWeek(
          "2024-11-25",
          selectedPeriod === "last_week",
        ),
        totalDuration: useTotalDurationOnWeek(
          "2024-11-25",
          selectedPeriod === "last_week",
        ),
        topTrack: useTopTrackOnWeek(
          "2024-11-25",
          selectedPeriod === "last_week",
        ),
        topArtist: useTopArtistOnWeek(
          "2024-11-25",
          selectedPeriod === "last_week",
        ),
        tabLabel: "This Week",
      },
      previous: {
        listeningBreakdown: {
          listeningBreakdown: [],
          isLoading: false,
          chartLabels: {
            xTicks: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            xAxisLabel: "Day",
          },
        },
        trackCount: useCountTracksOnWeek(
          "2024-11-24",
          selectedPeriod === "last_week",
        ),
        artistCount: useCountArtistsOnWeek(
          "2024-11-24",
          selectedPeriod === "last_week",
        ),
        totalDuration: useTotalDurationOnWeek(
          "2024-11-24",
          selectedPeriod === "last_week",
        ),
        topTrack: useTopTrackOnWeek(
          "2024-11-24",
          selectedPeriod === "last_week",
        ),
        topArtist: useTopArtistOnWeek(
          "2024-11-24",
          selectedPeriod === "last_week",
        ),
        tabLabel: "Last Week",
      },
    },
    last_month: {
      current: {
        listeningBreakdown: {
          listeningBreakdown: [],
          isLoading: false,
          chartLabels: {
            xTicks: [],
            xAxisLabel: "Day",
          },
        },
        trackCount: useCountTracksOnMonth(
          2024,
          11,
          selectedPeriod === "last_month",
        ),
        artistCount: useCountArtistsOnMonth(
          2024,
          11,
          selectedPeriod === "last_month",
        ),
        totalDuration: useTotalDurationOnMonth(
          2024,
          11,
          selectedPeriod === "last_month",
        ),
        topTrack: useTopTrackOnMonth(2024, 11, selectedPeriod === "last_month"),
        topArtist: useTopArtistOnMonth(
          2024,
          11,
          selectedPeriod === "last_month",
        ),
        tabLabel: "This Month",
      },
      previous: {
        listeningBreakdown: {
          listeningBreakdown: [],
          isLoading: false,
          chartLabels: {
            xTicks: [],
            xAxisLabel: "Day",
          },
        },
        trackCount: useCountTracksOnMonth(
          2024,
          10,
          selectedPeriod === "last_month",
        ),
        artistCount: useCountArtistsOnMonth(
          2024,
          10,
          selectedPeriod === "last_month",
        ),
        totalDuration: useTotalDurationOnMonth(
          2024,
          10,
          selectedPeriod === "last_month",
        ),
        topTrack: useTopTrackOnMonth(2024, 10, selectedPeriod === "last_month"),
        topArtist: useTopArtistOnMonth(
          2024,
          10,
          selectedPeriod === "last_month",
        ),
        tabLabel: "Last Month",
      },
    },
    last_year: {
      current: {
        listeningBreakdown: {
          listeningBreakdown: [],
          isLoading: false,
          chartLabels: {
            xTicks: [
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
            ],
            xAxisLabel: "Month",
          },
        },
        trackCount: useCountTracksOnYear(2024, selectedPeriod === "last_year"),
        artistCount: useCountArtistsOnYear(
          2024,
          selectedPeriod === "last_year",
        ),
        totalDuration: useTotalDurationOnYear(
          2024,
          selectedPeriod === "last_year",
        ),
        topTrack: useTopTrackOnYear(2024, selectedPeriod === "last_year"),
        topArtist: useTopArtistOnYear(2024, selectedPeriod === "last_year"),
        tabLabel: "This Year",
      },
      previous: {
        listeningBreakdown: {
          listeningBreakdown: [],
          isLoading: false,
          chartLabels: {
            xTicks: [
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
            ],
            xAxisLabel: "Month",
          },
        },
        trackCount: useCountTracksOnYear(2023, selectedPeriod === "last_year"),
        artistCount: useCountArtistsOnYear(
          2023,
          selectedPeriod === "last_year",
        ),
        totalDuration: useTotalDurationOnYear(
          2023,
          selectedPeriod === "last_year",
        ),
        topTrack: useTopTrackOnYear(2023, selectedPeriod === "last_year"),
        topArtist: useTopArtistOnYear(2023, selectedPeriod === "last_year"),
        tabLabel: "Last Year",
      },
    },
  };

  {
    const { hourlyListening, isLoading } = useListeningBreakdownOnDate(
      "2024-11-25",
      selectedPeriod === "today",
    );

    periodMap.today.current.listeningBreakdown.isLoading = isLoading;
    periodMap.today.current.listeningBreakdown.listeningBreakdown =
      processHourlyListening(hourlyListening);
  }
  {
    const { hourlyListening, isLoading } = useListeningBreakdownOnDate(
      "2024-11-24",
      selectedPeriod === "today",
    );

    periodMap.today.previous.listeningBreakdown.isLoading = isLoading;
    periodMap.today.previous.listeningBreakdown.listeningBreakdown =
      processHourlyListening(hourlyListening);
  }

  {
    const { weeklyListening, isLoading } = useListeningBreakdownOnWeek(
      "2024-11-25",
      selectedPeriod === "last_week",
    );

    periodMap.last_week.current.listeningBreakdown.isLoading = isLoading;
    periodMap.last_week.current.listeningBreakdown.listeningBreakdown =
      processWeeklyListening(weeklyListening);
  }
  {
    const { weeklyListening, isLoading } = useListeningBreakdownOnWeek(
      "2024-11-24",
      selectedPeriod === "last_week",
    );

    periodMap.last_week.previous.listeningBreakdown.isLoading = isLoading;
    periodMap.last_week.previous.listeningBreakdown.listeningBreakdown =
      processWeeklyListening(weeklyListening);
  }

  {
    const { monthlyListening, isLoading } = useListeningBreakdownOnMonth(
      2024,
      11,
      selectedPeriod === "last_month",
    );

    periodMap.last_month.current.listeningBreakdown.isLoading = isLoading;
    const processed = processMonthlyListening(monthlyListening);

    periodMap.last_month.current.listeningBreakdown.listeningBreakdown =
      processed;

    periodMap.last_month.current.listeningBreakdown.chartLabels.xTicks =
      generateListeningBreakdownXTicks(processed);
  }
  {
    const { monthlyListening, isLoading } = useListeningBreakdownOnMonth(
      2024,
      10,
      selectedPeriod === "last_month",
    );

    periodMap.last_month.previous.listeningBreakdown.isLoading = isLoading;
    const processed = processMonthlyListening(monthlyListening);

    periodMap.last_month.previous.listeningBreakdown.listeningBreakdown =
      processed;

    periodMap.last_month.previous.listeningBreakdown.chartLabels.xTicks =
      generateListeningBreakdownXTicks(processed);
  }

  {
    const { yearlyListening, isLoading } = useListeningBreakdownOnYear(
      2024,
      selectedPeriod === "last_year",
    );

    periodMap.last_year.current.listeningBreakdown.isLoading = isLoading;
    periodMap.last_year.current.listeningBreakdown.listeningBreakdown =
      processYearlyListening(yearlyListening);
  }
  {
    const { yearlyListening, isLoading } = useListeningBreakdownOnYear(
      2023,
      selectedPeriod === "last_year",
    );

    periodMap.last_year.previous.listeningBreakdown.isLoading = isLoading;
    periodMap.last_year.previous.listeningBreakdown.listeningBreakdown =
      processYearlyListening(yearlyListening);
  }

  const { current, previous } = periodMap[selectedPeriod];

  const { recentTracks, isLoading, hasMore, loadMore } = useRecentTracks();
  const recentTracksColumns = [
    { key: "timestamp", label: "Timestamp" },
    { key: "track_name", label: "Track Name" },
    { key: "artist_name", label: "Artist Name" },
  ];

  return (
    <div className="h-[calc(100vh-106px)]">
      <div className="w-full h-[10%] flex items-center justify-between bg-primary-700 p-4">
        <p className="text-foreground">Recent Activity</p>
        <PeriodDropdown
          items={dropdownItems}
          onSelectionChange={(key) => setSelectedPeriod(key as PeriodKey)}
        />
      </div>
      <Divider />
      <div className="w-full h-[90%] flex items-center justify-center bg-primary-700 p-4">
        <div className="h-full w-full flex flex-col bg-primary-700">
          <div className="w-full h-[25%] flex flex-row gap-4 p-2">
            {/* Time listened */}
            <ActivityCountCard
              currentValue={current.totalDuration.totalDuration}
              isLoading={
                current.totalDuration.isLoading ||
                previous.totalDuration.isLoading
              }
              isNumeric={false}
              previousValue={previous.totalDuration.totalDuration}
              selectedPeriod={selectedPeriod}
              title="Time listened"
            />

            {/* Songs listened */}
            <ActivityCountCard
              currentValue={current.trackCount.trackCount}
              isLoading={
                current.trackCount.isLoading || previous.trackCount.isLoading
              }
              isNumeric={true}
              previousValue={previous.trackCount.trackCount}
              selectedPeriod={selectedPeriod}
              title="Songs listened"
            />

            {/* Artists listened */}
            <ActivityCountCard
              currentValue={current.artistCount.artistCount}
              isLoading={
                current.artistCount.isLoading || previous.artistCount.isLoading
              }
              isNumeric={true}
              previousValue={previous.artistCount.artistCount}
              selectedPeriod={selectedPeriod}
              title="Artists listened"
            />
          </div>

          <div className="w-full h-[75%] flex flex-row gap-4 p-2">
            <div className="flex flex-col flex-[2] gap-y-4">
              {/* Listening Breakdown */}
              <ActivityBreakdownCard
                tabs={[
                  {
                    key: "current",
                    title: current.tabLabel,
                    isLoading: current.listeningBreakdown.isLoading,
                    content: (
                      <div className="w-full h-[350px] pt-6">
                        <BreakdownBarChart
                          data={current.listeningBreakdown.listeningBreakdown}
                          xAxisLabel={
                            current.listeningBreakdown.chartLabels.xAxisLabel
                          }
                          xTicks={current.listeningBreakdown.chartLabels.xTicks}
                          yAxisLabel="Duration"
                        />
                      </div>
                    ),
                  },
                  {
                    key: "previous",
                    title: previous.tabLabel,
                    isLoading: previous.listeningBreakdown.isLoading,
                    content: (
                      <div className="w-full h-[350px] pt-6">
                        <BreakdownBarChart
                          data={previous.listeningBreakdown.listeningBreakdown}
                          xAxisLabel={
                            previous.listeningBreakdown.chartLabels.xAxisLabel
                          }
                          xTicks={
                            previous.listeningBreakdown.chartLabels.xTicks
                          }
                          yAxisLabel="Duration"
                        />
                      </div>
                    ),
                  },
                ]}
                title="Listening Breakdown"
              />
            </div>

            <div className="flex flex-col flex-[1] gap-y-4">
              {/* Most Listened Artist */}
              <ActivityTopCard
                tabs={[
                  {
                    key: "currentArtist",
                    title: current.tabLabel,
                    isLoading: current.topArtist.isLoading,
                    content: current.topArtist.topArtist ? (
                      <ul className="list-disc">
                        <li>
                          <strong>Artist:</strong>{" "}
                          {current.topArtist.topArtist.artist_name}
                        </li>
                        <li>
                          <strong>Total Duration:</strong>{" "}
                          {secondsToString(
                            current.topArtist.topArtist.total_duration,
                          )}
                        </li>
                      </ul>
                    ) : (
                      <p>No top artist available</p>
                    ),
                  },
                  {
                    key: "previousArtist",
                    title: previous.tabLabel,
                    isLoading: previous.topArtist.isLoading,
                    content: previous.topArtist.topArtist ? (
                      <ul className="list-disc">
                        <li>
                          <strong>Artist:</strong>{" "}
                          {previous.topArtist.topArtist.artist_name}
                        </li>
                        <li>
                          <strong>Total Duration:</strong>{" "}
                          {secondsToString(
                            previous.topArtist.topArtist.total_duration,
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

              {/* Most Listened Track */}
              <ActivityTopCard
                tabs={[
                  {
                    key: "currentTrack",
                    title: current.tabLabel,
                    isLoading: current.topTrack.isLoading,
                    content: current.topTrack.topTrack ? (
                      <ul className="list-disc">
                        <li>
                          <strong>Track:</strong>{" "}
                          {current.topTrack.topTrack.track_name}
                        </li>
                        <li>
                          <strong>Artist:</strong>{" "}
                          {current.topTrack.topTrack.artist_name}
                        </li>
                        <li>
                          <strong>Album:</strong>{" "}
                          {current.topTrack.topTrack.album_name}
                        </li>
                        <li>
                          <strong>Total Duration:</strong>{" "}
                          {secondsToString(
                            current.topTrack.topTrack.total_duration,
                          )}
                        </li>
                      </ul>
                    ) : (
                      <p>No top track available</p>
                    ),
                  },
                  {
                    key: "previousTrack",
                    title: previous.tabLabel,
                    isLoading: previous.topTrack.isLoading,
                    content: previous.topTrack.topTrack ? (
                      <ul className="list-disc">
                        <li>
                          <strong>Track:</strong>{" "}
                          {previous.topTrack.topTrack.track_name}
                        </li>
                        <li>
                          <strong>Artist:</strong>{" "}
                          {previous.topTrack.topTrack.artist_name}
                        </li>
                        <li>
                          <strong>Album:</strong>{" "}
                          {previous.topTrack.topTrack.album_name}
                        </li>
                        <li>
                          <strong>Total Duration:</strong>{" "}
                          {secondsToString(
                            previous.topTrack.topTrack.total_duration,
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
            </div>

            {/* Recent Tracks */}
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
  );
}
