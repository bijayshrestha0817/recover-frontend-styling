import { Button, Modal, Stack } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StudentFormProvider, useStudentForm } from "../hooks/FormContext";
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

  const form = useStudentForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      age: 0,
      course: "",
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? "Name is required" : null),
      email: (value) => {
        if (value.trim().length === 0) {
          return "Email is required";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? null : "Invalid email format";
      },
      age: (value) => (value <= 0 ? "Age must be a positive number" : null),
      course: (value) =>
        value.trim().length === 0 ? "Course name is required" : null,
    },
  });

  const mutation = useMutation({
    mutationFn: POST_STUDENT,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      form.reset();
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
