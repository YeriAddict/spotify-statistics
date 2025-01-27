"use client";

import React from "react";
import { Card, CardHeader, CardBody, Divider, Spinner } from "@heroui/react";

import ListeningCalendarChart from "../charts/listening-calendarchart";

interface TrendsCalendarCardProps {
  title: string;
  data: Array<{
    day: string;
    value: number;
  }>;
  year: number;
  isLoading: boolean;
}

export function TrendsCalendarCard({
  title,
  data,
  year,
  isLoading,
}: TrendsCalendarCardProps) {
  return (
    <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
      <CardHeader className="flex bg-primary-700">
        <p className="font-semibold">{title}</p>
      </CardHeader>
      <Divider />
      <CardBody className="p-0">
        <div className="w-full h-full pt-6 flex items-center justify-center">
          {isLoading ? (
            <Spinner color="white" />
          ) : (
            <ListeningCalendarChart
              className="w-full h-[250px]"
              data={data}
              year={year}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
