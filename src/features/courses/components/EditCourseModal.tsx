import { Button, Group, Modal } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Course } from "@/types/ICourse";
import { CourseFormProvider } from "../hooks/FormContext";
import { useCourseFormLogic } from "../hooks/useCourseFormLogic";
import { CourseService } from "../services/coursesAPI";
import { NameInput } from "./NameInput";

interface EditCourseModalProps {
  opened: boolean;
  close: () => void;
  course: Course | null;
  color?: string;
}

const { UPDATE_COURSE } = CourseService();

export function EditCourseModal({
  opened,
  close,
  course,
  color,
}: EditCourseModalProps) {
  const queryClient = useQueryClient();

  const { form, resetForm } = useCourseFormLogic({
    mode: "edit",
    course,
    opened,
  });

  const mutation = useMutation({
    mutationFn: UPDATE_COURSE,
    onSuccess: (updateCourse) => {
      queryClient.setQueryData(["courses"], (old: Course[] = []) =>
        old.map((c) => (c.id === course?.id ? updateCourse : c)),
      );

      queryClient.invalidateQueries({ queryKey: ["courses"] });
      resetForm();
      close();
    },
  });

  const handleUpdate = (values: typeof form.values) => {
    if (!course) return;

    mutation.mutate({
      id: course.id,
      ...values,
    });
  };

  return (
    <Modal opened={opened} onClose={close} title="Edit Course" centered>
      <CourseFormProvider form={form}>
        <form onSubmit={form.onSubmit(handleUpdate)}>
          <NameInput />

          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={mutation.isPending} color={color}>
              Update
            </Button>
          </Group>
        </form>
      </CourseFormProvider>
    </Modal>
  );
}
