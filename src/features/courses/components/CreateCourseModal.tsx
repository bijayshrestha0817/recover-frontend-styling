import { Button, Modal, Stack } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Course } from "@/types/ICourse";
import { CourseFormProvider } from "../hooks/FormContext";
import { useCourseFormLogic } from "../hooks/useCourseFormLogic";
import { CourseService } from "../services/coursesAPI";
import { NameInput } from "./NameInput";

interface CreateCourseModalProps {
  opened: boolean;
  close: () => void;
}

const { POST_COURSE } = CourseService();

export function CreateCourseModal({ opened, close }: CreateCourseModalProps) {
  const queryClient = useQueryClient();

  const { form, resetForm } = useCourseFormLogic({
    mode: "create",
  });

  const mutation = useMutation({
    mutationFn: POST_COURSE,
    onSuccess: (storeCourse) => {
      queryClient.setQueryData(["courses"], (old: Course[] = []) =>
        old.map((c) => (c.id === storeCourse.id ? storeCourse : c)),
      );

      queryClient.invalidateQueries({ queryKey: ["courses"] });
      resetForm();
      close();
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    mutation.mutate(values);
  };

  return (
    <Modal opened={opened} onClose={close} title="Add Course" centered>
      <CourseFormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <NameInput />

            <Button type="submit" loading={mutation.isPending}>
              Submit
            </Button>
          </Stack>
        </form>
      </CourseFormProvider>
    </Modal>
  );
}
