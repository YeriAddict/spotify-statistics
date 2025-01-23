import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

import { ChevronDownIcon } from "../icons/general-icons";

interface DropdownItemProps {
  key: string;
  label: string;
}

interface PeriodDropdownProps {
  items: DropdownItemProps[];
}

export default function PeriodDropdown({ items }: PeriodDropdownProps) {
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([items[0]?.key || ""]),
  );

  const selectedValue = React.useMemo(() => {
    if (selectedKeys.size === 0) return "";

    return Array.from(selectedKeys)
      .map((key) => items.find((item) => item.key === key)?.label || "")
      .join(", ");
  }, [selectedKeys, items]);

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
        {items.map((item) => (
          <DropdownItem key={item.key} className="hover:bg-primary-500">
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
