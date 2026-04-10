"use client";

import {
  Center,
  Group,
  ScrollArea,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";

interface Column<T> {
  key: keyof T;
  label: string;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  onSort?: (field: keyof T) => void;
  sortBy?: keyof T | null;
  reversed?: boolean;
  loading?: boolean;
}

export function TableComponent<T extends Record<string, unknown>>({
  data,
  columns,
  onSort,
  sortBy,
  reversed,
  loading,
}: Props<T>) {
  const getIcon = (field: keyof T) => {
    if (sortBy !== field) return <IconSelector size={16} />;
    return reversed ? (
      <IconChevronUp size={16} />
    ) : (
      <IconChevronDown size={16} />
    );
  };

  return (
    <ScrollArea h={600}>
      <Table stickyHeader>
        <Table.Thead>
          <Table.Tr>
            {columns.map((col) => (
              <Table.Th key={String(col.key)}>
                <UnstyledButton onClick={() => onSort?.(col.key)}>
                  <Group justify="space-between">
                    <Text fw={500} fz="sm">
                      {col.label}
                    </Text>
                    <Center>{getIcon(col.key)}</Center>
                  </Group>
                </UnstyledButton>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <Table.Tr key={row.id as number}>
                {columns.map((col) => {
                  const cellValue = row[col.key];

                  let displayValue: React.ReactNode = "";

                  if (typeof cellValue === "object" && cellValue !== null) {
                    if ("course_name" in cellValue) {
                      displayValue = (cellValue as { course_name: string })
                        .course_name;
                    } else {
                      displayValue = JSON.stringify(cellValue);
                    }
                  } else {
                    displayValue =
                      cellValue !== null && cellValue !== undefined
                        ? String(cellValue)
                        : "";
                  }

                  return (
                    <Table.Td key={String(col.key)}>{displayValue}</Table.Td>
                  );
                })}
              </Table.Tr>
            ))
          ) : !loading ? (
            <Table.Tr>
              <Table.Td colSpan={columns.length}>
                <Text ta="center">No data found</Text>
              </Table.Td>
            </Table.Tr>
          ) : null}

          {loading && (
            <Table.Tr>
              <Table.Td colSpan={columns.length}>
                <Text ta="center">Fetching...</Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
