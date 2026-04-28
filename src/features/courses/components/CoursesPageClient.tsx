"use client";

import { Button, Group, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TableComponent } from "@/components/common/TableComponent";
import type { Course } from "@/types/ICourse";
import { CourseService } from "../services/coursesAPI";
import { CreateCourseModal } from "./CreateCourseModal";
import DeleteCourseModal from "./DeleteCourseModal";
import { EditCourseModal } from "./EditCourseModal";

const { GET_COURSES } = CourseService();

export default function CoursesPageClient() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [editOpened, editHandlers] = useDisclosure(false);
  const [deleteOpened, deleteHandlers] = useDisclosure(false);
  const [createOpened, openHandlers] = useDisclosure(false);

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses", page],
    queryFn: () => GET_COURSES(page),
    staleTime: 1000*6*5
  });

  const courses = data?.data?.results ?? [];
  const total = data?.data?.count ?? 0;

  return (
    <>
      <Group justify="flex-end" m="md">
        <Button
          color="blue"
          onClick={() => {
            openHandlers.open();
          }}
          className="rounded-none"
        >
          Create Course
        </Button>
      </Group>

      {isError && <div>Failed to load courses</div>}

      <TableComponent<Course>
        data={courses}
        columns={[{ key: "name", label: "Course Name" }]}
        page={page}
        limit={limit}
        loading={isLoading}
        renderActions={(row: Course) => (
          <Group gap="xs">
            <Button
              size="xs"
              color="green"
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

      <CreateCourseModal opened={createOpened} close={openHandlers.close} />

      <EditCourseModal
        opened={editOpened}
        close={editHandlers.close}
        course={selectedCourse}
        color="green"
      />
      <DeleteCourseModal
        opened={deleteOpened}
        close={deleteHandlers.close}
        course={selectedCourse}
        color="red"
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
