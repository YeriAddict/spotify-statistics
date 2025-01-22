"use client";

import React from "react";
import { Tabs, Tab, Spinner } from "@heroui/react";

interface TabContentProps {
  key: string;
  title: string;
  isLoading: boolean;
  content: React.ReactNode;
}

interface ActivityTopTabsProps {
  tabs: TabContentProps[];
  className?: string;
  contentClassName?: string;
}

export function ActivityTabs({
  tabs,
  className,
  contentClassName,
}: ActivityTopTabsProps) {
  return (
    <Tabs
      fullWidth
      aria-label="Activity Tabs"
      className={`bg-primary-900 ${className || ""}`}
      color="primary"
      placement="top"
      variant="light"
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.key}
          title={
            <div className="flex items-center space-x-2">
              <p className="text-foreground font-bold">{tab.title}</p>
            </div>
          }
        >
          <div className="flex items-center justify-center">
            {tab.isLoading ? (
              <Spinner color="white" />
            ) : (
              <div className={contentClassName}>{tab.content}</div>
            )}
          </div>
        </Tab>
      ))}
    </Tabs>
  );
}
