"use client";

import { Button, Group } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CourseFormProvider, useCourseForm } from "../hooks/FormContext";
import { CourseService } from "../services/coursesAPI";
import { NameInput } from "./NameInput";

const { POST_COURSE } = CourseService();
export default function CourseForm() {
  const queryClient = useQueryClient();
  const form = useCourseForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? "Name is required" : null),
    },
  });

  const mutation = useMutation({
    mutationFn: POST_COURSE,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    await mutation.mutateAsync(values);
    form.reset();
  };

  return (
    <CourseFormProvider form={form}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Group justify="flex-end" mt="md">
          <NameInput />
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </CourseFormProvider>
  );
}
