"use client";

import { TableComponent } from "@/components/common/TableComponent";
import type { Course } from "@/types/ICourse";
import { Button, Group, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CourseService } from "../services/coursesAPI";
import CourseForm from "./CourseForm";
import DeleteCourseModal from "./DeleteCourseModal";
import { EditCourseModal } from "./EditCourseModal";

const { GET_COURSES } = CourseService();

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [editOpened, editHandlers] = useDisclosure(false);
  const [deleteOpened, deleteHandlers] = useDisclosure(false);

  const [page, setPage] = useState(1);
  const limit = 10;

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

      <TableComponent<Course>
        data={courses}
        columns={[{ key: "name", label: "Course Name" }]}
        page={page}
        limit={10}
        loading={isLoading}
        renderActions={(row: Course) => (
          <Group gap="xs">
            <Button
              size="xs"
              onClick={() => {
                setSelectedCourse(row);
                editHandlers.open();
              }}
            >
              Edit
            </Button>

            <Button
              size="xs"
              color="red"
              onClick={() => {
                setSelectedCourse(row);
                deleteHandlers.open();
              }}
            >
              Delete
            </Button>
          </Group>
        )}
      />

      <EditCourseModal
        opened={editOpened}
        close={editHandlers.close}
        course={selectedCourse}
      />
      <DeleteCourseModal
        opened={deleteOpened}
        close={deleteHandlers.close}
        course={selectedCourse}
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
