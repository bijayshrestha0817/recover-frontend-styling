"use client";
import { Button, Modal, Stack } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Student } from "@/types/IStudent";
import { StudentFormProvider } from "../hooks/FormContext";
import { useStudentFormLogic } from "../hooks/useStudentFormLogic";
import { StudentService } from "../services/studentAPI";
import { AgeInput } from "./AgeInput";
import { CourseNameInput } from "./CourseNameInput";
import { EmailInput } from "./EmailInput";
import { NameInput } from "./NameInput";

interface CreateStudentModalProps {
  opened: boolean;
  close: () => void;
}

const { POST_STUDENT } = StudentService();

export function CreateStudentModal({ opened, close }: CreateStudentModalProps) {
  const queryClient = useQueryClient();

  const { form, resetForm } = useStudentFormLogic({
    mode: "create",
  });

  const mutation = useMutation({
    mutationFn: POST_STUDENT,
    onSuccess: (storeStudent) => {
      queryClient.setQueryData(["students"], (old: Student[] = []) =>
        old.map((s) => (s.id === storeStudent.id ? storeStudent : s)),
      );

      queryClient.invalidateQueries({ queryKey: ["students"] });
      resetForm();
      toast.success(`Course "${storeStudent.name}" created successfully!`);
      close();
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    mutation.mutate(values);
  };

  return (
    <Modal opened={opened} onClose={close} title="Add Student" centered>
      <StudentFormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <NameInput />
            <AgeInput />
            <EmailInput />
            <CourseNameInput />

            <Button type="submit" loading={mutation.isPending}>
              Submit
            </Button>
          </Stack>
        </form>
      </StudentFormProvider>
    </Modal>
  );
}
