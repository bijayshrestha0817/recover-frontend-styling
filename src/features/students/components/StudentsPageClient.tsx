"use client";

import { Button, Group, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TableComponent } from "@/components/common/TableComponent";
import type { Student } from "@/types/IStudent";
import { StudentService } from "../services/studentAPI";
import { CreateStudentModal } from "./CreateStudentModal";
import DeleteStudentModal from "./DeleteStudentModal";
import EditStudentModal from "./EditStudentModal";

const { GET_STUDENTS } = StudentService();

const StudentsPageClient = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [createOpened, openHandlers] = useDisclosure(false);
  const [editOpened, editHandlers] = useDisclosure(false);
  const [deleteOpened, deleteHandlers] = useDisclosure(false);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["students", page],
    queryFn: () => GET_STUDENTS(page),
    staleTime: 1000 * 6 * 5,
  });

  const students = data?.data?.results ?? [];
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
          Add Student
        </Button>
      </Group>

      {isError && <div>Failed to load students</div>}

      <TableComponent<Student>
        data={students}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "age", label: "Age" },
          {
            key: "course_name",
            label: "Course",
          },
        ]}
        page={page}
        limit={limit}
        loading={isLoading}
        renderActions={(row: Student) => (
          <Group gap="xs">
            <Button
              size="xs"
              color="green"
              onClick={() => {
                setSelectedStudent(row);
                editHandlers.open();
              }}
            >
              Edit
            </Button>

            <Button
              size="xs"
              color="red"
              onClick={() => {
                setSelectedStudent(row);
                deleteHandlers.open();
              }}
            >
              Delete
            </Button>
          </Group>
        )}
      />

      <CreateStudentModal opened={createOpened} close={openHandlers.close} />

      <EditStudentModal
        opened={editOpened}
        close={editHandlers.close}
        student={selectedStudent}
        color="green"
      />

      <DeleteStudentModal
        opened={deleteOpened}
        close={deleteHandlers.close}
        student={selectedStudent}
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
};

export default StudentsPageClient;
