"use client";
import { Group, Pagination, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { TableComponent } from "@/components/common/TableComponent";

interface Course {
  id: number;
  course_name: string;
}
interface Student extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  course: Course;
  age: number;
}
export default function StudentsPage() {
  const [data, setData] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  // const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Student | null>(null);
  const [reversed, setReversed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/v1/student-list/?page=${page}&ordering=${reversed ? "-" : ""}${sortBy ?? ""}`,
        );

        const json = await res.json();
        setData(json.results);
        setTotal(json.count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, sortBy, reversed]);

  const handleSort = (field: keyof Student) => {
    if (sortBy === field) {
      setReversed(!reversed);
    } else {
      setSortBy(field);
      setReversed(false);
    }
  };

  const pageSize = 15;

  return (
    <>
      <Group justify="flex-end" mb="md">
        <TextInput
          placeholder="Search..."
          leftSection={<IconSearch size={16} />}
        />
      </Group>

      <TableComponent
        data={data}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "age", label: "Age" },
          { key: "course_name", label: "Course" },
        ]}
        onSort={handleSort}
        sortBy={sortBy}
        reversed={reversed}
        loading={loading}
      />

      <div className="fixed bottom-8">
        <Pagination
          value={page}
          onChange={setPage}
          total={Math.ceil(total / pageSize)}
          mt="md"
          withEdges
        />
      </div>
    </>
  );
}
