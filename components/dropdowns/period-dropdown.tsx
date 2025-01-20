import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import React from "react";

import { ChevronDownIcon } from "../icons/general-icons";

export default function PeriodDropdown() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["last_day"]));

  const formatKey = (key: string) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const selectedValue = React.useMemo(() => {
    if (selectedKeys.size === 0) return "";

    return Array.from(selectedKeys)
      .map((key) => formatKey(key as string))
      .join(", ");
  }, [selectedKeys]);

  return (
    <Dropdown
      classNames={{
        content: "bg-primary-400",
      }}
    >
      <DropdownTrigger>
        <Button
          className="capitalize bg-primary-500 border-primary-400 hover:bg-primary-300 text-foreground"
          endContent={<ChevronDownIcon className="text-small" />}
          size="lg"
          variant="bordered"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="bordered"
        onSelectionChange={(keys) =>
          setSelectedKeys(new Set(keys as Set<string>))
        }
      >
        <DropdownItem key="last_day" className="hover:bg-primary-500">
          Last Day
        </DropdownItem>
        <DropdownItem key="last_month" className="hover:bg-primary-500">
          Last Month
        </DropdownItem>
        <DropdownItem key="last_year" className="hover:bg-primary-500">
          Last Year
        </DropdownItem>
        <DropdownItem key="all_time" className="hover:bg-primary-500">
          All Time
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
