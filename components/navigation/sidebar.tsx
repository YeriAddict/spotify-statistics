import React from "react";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";

export const Sidebar = () => {
  return (
    <div className="bg-gray-800 w-[15%] h-full flex flex-col gap-4 p-4">
      {siteConfig.sidebarNavItems.map((item, index) => (
        <NextLink key={index} href={item.href}>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            {item.label}
          </button>
        </NextLink>
      ))}
    </div>
  );
};
