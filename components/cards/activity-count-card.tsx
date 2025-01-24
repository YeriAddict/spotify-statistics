import React from "react";
import { Card, CardBody, CardHeader, Divider, Spinner } from "@heroui/react";
import clsx from "clsx";

import { secondsToString } from "@/utils/time-processing";

interface StatCardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  isNumeric: boolean;
  isLoading: boolean;
  selectedPeriod: string;
}

export function ActivityCountCard({
  title,
  currentValue,
  previousValue,
  isNumeric,
  isLoading,
  selectedPeriod,
}: StatCardProps) {
  const processSelectedPeriod = (period: string): string => {
    if (period === "today") return "yesterday";

    return period.replace(/_/g, " ");
  };

  const processedPeriod = processSelectedPeriod(selectedPeriod);

  let differenceText: string;
  let formattedValue: number | string;

  if (isNumeric) {
    formattedValue = Math.abs(previousValue - currentValue);

    if (previousValue > currentValue) {
      differenceText = `less than ${processedPeriod}`;
    } else {
      differenceText = `more than ${processedPeriod}`;
    }
  } else {
    formattedValue = secondsToString(Math.abs(previousValue - currentValue));
    if (previousValue > currentValue) {
      differenceText = `less than ${processedPeriod}`;
    } else {
      differenceText = `more than ${processedPeriod}`;
    }
  }

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
              ({formattedValue} {differenceText})
            </p>
          </div>
        ) : (
          <div className="flex flex-row justify-between w-full">
            <p className="text-left">
              {secondsToString(currentValue) || "00h00m00s"}
            </p>
            <p
              className={clsx(
                "text-right italic",
                previousValue > currentValue
                  ? "text-danger-400"
                  : "text-success-400",
              )}
            >
              ({formattedValue} {differenceText})
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
