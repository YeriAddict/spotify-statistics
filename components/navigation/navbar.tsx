"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useState } from "react";

import { RabbitIcon } from "../icons/general-icons";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuItemClick = () => setIsMenuOpen(false);

  return (
    <>
      <NextUINavbar
        isBordered
        className="bg-primary-900"
        maxWidth="xl"
        position="sticky"
      >
        <NavbarContent className="flex-[1] sm:flex-[1]" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <RabbitIcon />
              <p className="font-bold text-inherit">denis.leang</p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="flex-[4] sm:flex-[4]" justify="center">
          <ul className="bg-primary-700 border-primary-600 hidden lg:flex gap-12 justify-start h-[70%] items-center rounded-full border-2 ">
            {siteConfig.navItems.map((item, index) => (
              <NavbarItem
                key={item.label}
                className={clsx(
                  "flex items-center justify-center",
                  index === 0 ? "pl-4" : "",
                  index === siteConfig.navItems.length - 1 ? "pr-4" : "",
                )}
              >
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium text-center font-bold hover:text-primary-300",
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent className="flex-[1] sm:flex-[1]" justify="end">
          <NavbarItem className="hidden sm:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle onClick={handleMenuToggle} />
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="text-foreground"
                  href={item.href}
                  size="lg"
                  onClick={handleMenuItemClick}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};
