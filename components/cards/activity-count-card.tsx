import React from "react";
import { Card, CardBody, CardHeader, Divider, Spinner } from "@heroui/react";
import clsx from "clsx";

import {
  stringToSeconds,
  formatDifferenceInTime,
} from "@/utils/string-operations";

interface StatCardProps {
  title: string;
  currentValue: number | string;
  previousValue: number | string;
  isLoading: boolean;
}

export function ActivityCountCard({
  title,
  currentValue,
  previousValue,
  isLoading,
}: StatCardProps) {
  const isNumeric =
    typeof currentValue === "number" && typeof previousValue === "number";

  return (
    <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
      <CardHeader className="flex bg-primary-700">
        <p className="font-semibold">{title}</p>
      </CardHeader>
      <Divider />
      <CardBody className="flex justify-center items-center">
        {isLoading ? (
          <Spinner color="white" />
        ) : isNumeric ? (
          <div className="flex flex-row justify-between w-full">
            <p className="text-left">{currentValue}</p>
            <p
              className={clsx(
                "text-right italic",
                previousValue > currentValue
                  ? "text-danger-400"
                  : "text-success-400",
              )}
            >
              ({currentValue - previousValue > 0 ? "+" : ""}
              {currentValue - previousValue}{" "}
              {previousValue > currentValue
                ? "less than yesterday"
                : "more than yesterday"}
              )
            </p>
          </div>
        ) : (
          <div className="flex flex-row justify-between w-full">
            <p className="text-left">{currentValue || "00h00m00s"}</p>
            <p
              className={clsx(
                "text-right italic",
                stringToSeconds(previousValue as string) >
                  stringToSeconds(currentValue as string)
                  ? "text-danger-400"
                  : "text-success-400",
              )}
            >
              (
              {formatDifferenceInTime(
                currentValue as string,
                previousValue as string,
              ) || "00h00m00s"}{" "}
              {stringToSeconds(previousValue as string) >
              stringToSeconds(currentValue as string)
                ? "less than yesterday"
                : "more than yesterday"}
              )
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
