"use client";

import { TableComponent } from "@/components/common/TableComponent";
import { Group, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CourseService } from "../services/coursesAPI";
import CourseForm from "./CourseForm";

const { GET_COURSES } = CourseService();

export default function CoursesPage() {
  const [page, setPage] = useState(1);
  const limit = 15;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses", page],
    queryFn: () => GET_COURSES(page),
  });

  const courses = data?.results ?? [];
  const total = data?.count ?? 0;

  return (
    <>
      <Group justify="flex-end" mb="md">
        <CourseForm />
      </Group>

      {isError && <div>Failed to load courses</div>}

      <TableComponent
        data={courses}
        columns={[{ key: "name", label: "Course Name" }]}
        page={page}
        limit={limit}
        loading={isLoading}
      />

      <div className="fixed bottom-6">
        <Pagination
          value={page}
          onChange={setPage}
          total={Math.ceil(total / limit)}
          mt="md"
          withEdges
        />
      </div>
    </>
  );
}
