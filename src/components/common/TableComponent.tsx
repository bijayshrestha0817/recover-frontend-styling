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
import LoaderComponent from "./LoaderComponent";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  page?: number;
  limit?: number;
  onSort?: (field: keyof T) => void;
  sortBy?: keyof T | null;
  reversed?: boolean;
  loading?: boolean;
  renderActions?: (row: T) => React.ReactNode;
}

export function TableComponent<T extends { id: number }>({
  data,
  columns,
  page = 1,
  limit = 10,
  onSort,
  sortBy,
  reversed,
  loading,
  renderActions,
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
            <Table.Th>S.N.</Table.Th>

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
            {renderActions && <Table.Th>Actions</Table.Th>}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <Table.Tr key={row.id}>
                <Table.Td>{(page - 1) * limit + index + 1}</Table.Td>

                {columns.map((col) => (
                  <Table.Td key={String(col.key)}>
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </Table.Td>
                ))}

                {renderActions && <Table.Td>{renderActions(row)}</Table.Td>}
              </Table.Tr>
            ))
          ) : !loading ? (
            <Table.Tr>
              <Table.Td colSpan={columns.length + 1}>
                <Text ta="center">No data found</Text>
              </Table.Td>
            </Table.Tr>
          ) : null}

          {loading && (
            <Table.Tr>
              <Table.Td colSpan={columns.length + 3}>
                <LoaderComponent />
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
