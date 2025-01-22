"use client";

import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@heroui/react";

import { RecordTable } from "../tables/record-table";

interface ActivityRecentCardProps {
  columns: { key: string; label: string }[];
  data: Record<string, any>[];
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  title?: string;
}

export function ActivityRecentTracksCard({
  columns,
  data,
  hasMore,
  isLoading,
  onLoadMore,
  title = "Last Songs Listened",
}: ActivityRecentCardProps) {
  return (
    <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
      <CardHeader className="flex bg-primary-700">
        <p className="font-semibold">{title}</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <RecordTable
          classNames={{
            th: "bg-primary-700 text-[12px]",
            td: "text-[12px]",
          }}
          columns={columns}
          data={data}
          hasMore={hasMore}
          isLoading={isLoading}
          title={title}
          onLoadMore={onLoadMore}
        />
      </CardBody>
    </Card>
  );
}
