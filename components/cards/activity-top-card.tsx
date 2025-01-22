"use client";

import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@heroui/react";

import { ActivityTopTabs } from "../tabs/activity-top-tabs";

interface TabContentProps {
  key: string;
  title: string;
  isLoading: boolean;
  content: React.ReactNode;
}

interface ActivityTopCardProps {
  title: string;
  tabs: TabContentProps[];
}

export function ActivityTopCard({ title, tabs }: ActivityTopCardProps) {
  return (
    <Card className="flex-1 bg-primary-500 border-primary-400 border-2">
      <CardHeader className="flex bg-primary-700">
        <p className="font-semibold">{title}</p>
      </CardHeader>
      <Divider />
      <CardBody className="p-0">
        <ActivityTopTabs tabs={tabs} />
      </CardBody>
    </Card>
  );
}
