"use client";

import { TableComponent } from "@/components/common/TableComponent";
import { Group, Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { CourseService } from "../services/coursesAPI";
import CourseForm from "./CourseForm";

interface Course extends Record<string, unknown> {
  id: number;
  name: string;
}

const { GET_COURSES } = CourseService();

export default function CoursesPage() {
  const [data, setData] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  // const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Course | null>(null);
  const [reversed, setReversed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await GET_COURSES(page);

        setData(res.results);
        setTotal(res.count);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleSort = (field: keyof Course) => {
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
        <CourseForm />
      </Group>

      <TableComponent
        data={data}
        columns={[
          { key: "name", label: "Course Name" },
        ]}
        onSort={handleSort}
        sortBy={sortBy}
        reversed={reversed}
        loading={loading}
        page={page}
        limit={pageSize}
      />

      <div className="fixed bottom-6">
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
