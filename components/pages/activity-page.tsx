"use client";

import { Card, CardBody, CardHeader, Divider } from "@heroui/react";

import { RecentTracksTable } from "../tables/recent-tracks-table";

import { useRecentTracks } from "@/hooks/useRecentTracks";

export default function ActivityPageComponent() {
  const { recentTracks, isLoading, hasMore, loadMore } = useRecentTracks();

  const columns = [
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
              <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
                <CardHeader className="flex bg-primary-700">
                  <p className="font-semibold">Time listened</p>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>Make beautiful</p>
                </CardBody>
              </Card>
              <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
                <CardHeader className="flex bg-primary-700">
                  <p className="font-semibold">Songs listened</p>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>Make beautiful</p>
                </CardBody>
              </Card>
              <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
                <CardHeader className="flex bg-primary-700">
                  <p className="font-semibold">Artists listened</p>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>Make beautiful</p>
                </CardBody>
              </Card>
            </div>
            <div className="w-full h-[75%] flex flex-row gap-4 p-2">
              <div className="flex flex-col flex-[2] gap-y-4">
                <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
                  <CardHeader className="flex bg-primary-700">
                    <p className="font-semibold">Songs listened</p>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>Make beautiful</p>
                  </CardBody>
                </Card>
                <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
                  <CardHeader className="flex bg-primary-700">
                    <p className="font-semibold">Songs listened</p>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>Make beautiful</p>
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
                    <p>Make beautiful</p>
                  </CardBody>
                </Card>
                <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
                  <CardHeader className="flex bg-primary-700">
                    <p className="font-semibold">Most listened song</p>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>Make beautiful</p>
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
                      columns={columns}
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
