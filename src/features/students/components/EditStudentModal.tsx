"use client";

import type { Student } from "@/types/IStudent";
import { Button, Group, Modal, Stack } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StudentFormProvider } from "../hooks/FormContext";
import { useStudentFormLogic } from "../hooks/useStudentFormLogic";
import { StudentService } from "../services/studentAPI";
import { AgeInput } from "./AgeInput";
import { CourseNameInput } from "./CourseNameInput";
import { EmailInput } from "./EmailInput";
import { NameInput } from "./NameInput";

interface EditStudentModalProps {
  opened: boolean;
  close: () => void;
  student: Student | null;
  color?: string;
}

const { UPDATE_STUDENT } = StudentService();

export default function EditStudentModal({
  opened,
  close,
  student,
  color,
}: EditStudentModalProps) {
  const queryClient = useQueryClient();

  const { form, resetForm } = useStudentFormLogic({
    mode: "edit",
    student,
    opened,
  });

  const mutation = useMutation({
    mutationFn: UPDATE_STUDENT,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      handleClose();
    },
  });

  const handleClose = () => {
    resetForm();
    close();
  };

  const handleSubmit = (values: typeof form.values) => {
    if (!student) return;

    mutation.mutate({
      id: student.id,
      name: values.name.trim(),
      email: values.email.trim(),
      age: values.age,
      course: values.course,
    });
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Edit Student" centered>
      <StudentFormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <NameInput />
            <EmailInput />
            <AgeInput />
            <CourseNameInput />

            <Group justify="flex-end" mt="md">
              <Button type="submit" loading={mutation.isPending} color={color}>
                Update
              </Button>
            </Group>
          </Stack>
        </form>
      </StudentFormProvider>
    </Modal>
  );
}
