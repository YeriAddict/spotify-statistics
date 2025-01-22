"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@heroui/react";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";

interface Column {
  key: string;
  label: string;
}

interface GenericTableProps {
  title?: string;
  columns: Column[];
  data: Record<string, any>[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  classNames?: {
    base?: string;
    wrapper?: string;
    th?: string;
    td?: string;
  };
}

export function RecordTable({
  title,
  columns,
  data,
  isLoading,
  hasMore,
  onLoadMore,
  classNames = {},
}: GenericTableProps) {
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore,
  });

  return (
    <Table
      aria-label={title}
      baseRef={scrollerRef}
      bottomContent={
        hasMore ? (
          <div className="flex w-full justify-center">
            <Spinner ref={loaderRef} color="white" />
          </div>
        ) : null
      }
      classNames={{
        base: classNames.base || "h-full w-full",
        wrapper:
          classNames.wrapper || "bg-primary-500 border-primary-400 border-2",
        th: classNames.th || "bg-primary-700",
        td: classNames.td || "",
      }}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={data}
        loadingContent={<Spinner color="white" />}
      >
        {(item) => (
          <TableRow key={item.id || item[columns[0].key]}>
            {columns.map((column) => (
              <TableCell key={column.key}>{item[column.key]}</TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
