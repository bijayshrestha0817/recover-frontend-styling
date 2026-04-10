"use client";

import {
  Center,
  Group,
  keys,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconSelector,
} from "@tabler/icons-react";
import { useState } from "react";
import { DemoData } from "@/constants/students";
import classes from "@/styles/TableSort.module.css";

interface RowData {
  name: string;
  email: string;
  company: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;

  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query)),
  );
}

function sortData(
  data: RowData[],
  payload: {
    sortBy: keyof RowData | null;
    reversed: boolean;
    search: string;
  },
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) =>
      payload.reversed
        ? b[sortBy].localeCompare(a[sortBy])
        : a[sortBy].localeCompare(b[sortBy]),
    ),
    payload.search,
  );
}

export function TableSort() {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(DemoData);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(DemoData, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearch(value);
    setSortedData(
      sortData(DemoData, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      }),
    );
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.email}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.company}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Group justify="flex-end">
        <TextInput
          placeholder="Search by any field"
          mt="xl"
          mb="md"
          w={300}
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
      </Group>

      <ScrollArea h={550}>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          stickyHeader
        >
          <Table.Thead>
            <Table.Tr>
              <Th
                sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === "email"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("email")}
              >
                Email
              </Th>
              <Th
                sorted={sortBy === "company"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("company")}
              >
                Company
              </Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={3}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
