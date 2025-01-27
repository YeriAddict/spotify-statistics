"use client";

import React from "react";
import { Card, CardHeader, CardBody, Divider, Spinner } from "@heroui/react";

import BreakdownHorizontalBarChart from "../charts/breakdown-horizontal-barchart";
import BreakdownVerticalBarChart from "../charts/breakdown-vertical-barchart";

interface TrendsAverageCardProps {
  title: string;
  chartType: "horizontal" | "vertical";
  data: any;
  xAxisLabel: string;
  xTicks?: string[];
  yAxisLabel: string;
  yTicks?: string[];
  yAxisLabelOffset: number;
  isLoading: boolean;
}

export function TrendsAverageCard({
  title,
  chartType,
  data,
  xAxisLabel,
  xTicks,
  yAxisLabel,
  yTicks,
  yAxisLabelOffset,
  isLoading,
}: TrendsAverageCardProps) {
  return (
    <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
      <CardHeader className="flex bg-primary-700">
        <p className="font-semibold">{title}</p>
      </CardHeader>
      <Divider />
      <CardBody className="p-0">
        <div className="w-full h-[350px] pt-6 flex items-center justify-center">
          {isLoading ? (
            <Spinner color="white" />
          ) : chartType === "horizontal" ? (
            <BreakdownHorizontalBarChart
              className="w-full h-[250px]"
              data={data}
              xAxisLabel={xAxisLabel}
              xTicks={xTicks}
              yAxisLabel={yAxisLabel}
              yAxisLabelOffset={yAxisLabelOffset}
            />
          ) : (
            <BreakdownVerticalBarChart
              className="w-full h-[250px]"
              data={data}
              xAxisLabel={xAxisLabel}
              yTicks={yTicks}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
