"use client";

import React from "react";
import { Divider, Link, Spacer } from "@heroui/react";
import { Button } from "@heroui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  AnalyticsIcon,
  MicrophoneIcon,
  MusicIcon,
  RecentIcon,
  VinylIcon,
} from "../icons/general-icons";

import { siteConfig } from "@/config/site";

export const Sidebar = () => {
  const pathname = usePathname();

  const navSectionsWithIcons = siteConfig.sidebarNavItems.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      let icon;

      switch (item.label) {
        case "Activity":
          icon = <RecentIcon />;
          break;
        case "Trends":
          icon = <AnalyticsIcon />;
          break;
        case "Artists":
          icon = <MicrophoneIcon />;
          break;
        case "Albums":
          icon = <VinylIcon />;
          break;
        case "Songs":
          icon = <MusicIcon />;
          break;
        default:
          icon = null;
      }

      return { ...item, icon };
    }),
  }));

  return (
    <>
      <div className="w-[15%] h-full flex flex-col p-1 bg-primary-800">
        {navSectionsWithIcons.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <p className="text-sm text-foreground font-bold mb-2">
              {section.category}
            </p>

            {section.items.map((item, itemIndex) => (
              <Button
                key={itemIndex}
                as={Link}
                className={clsx(
                  "text-foreground w-full justify-start",
                  pathname === item.href
                    ? "bg-primary-600"
                    : "bg-primary-800 hover:bg-primary-600",
                )}
                href={item.href}
                size="lg"
                startContent={item.icon}
              >
                {item.label}
              </Button>
            ))}

            <Spacer y={2} />

            {sectionIndex < navSectionsWithIcons.length - 1 && <Divider />}
          </div>
        ))}
      </div>
      <Divider orientation="vertical" />
    </>
  );
};
