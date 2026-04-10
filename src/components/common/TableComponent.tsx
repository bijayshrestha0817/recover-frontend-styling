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
    <ScrollArea h={400}>
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
          {loading ? (
            <Table.Tr>
              <Table.Td colSpan={columns.length}>
                <Text ta="center">Loading...</Text>
              </Table.Td>
            </Table.Tr>
          ) : data.length > 0 ? (
            data.map((row) => (
              <Table.Tr key={JSON.stringify(row)}>
                {columns.map((col) => {
                  const cellValue = row[col.key];
                  return (
                    <Table.Td key={String(col.key)}>
                      {cellValue !== null && cellValue !== undefined
                        ? String(cellValue)
                        : ""}
                    </Table.Td>
                  );
                })}
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={columns.length}>
                <Text ta="center">No data found</Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
