"use client";

import { Button, Group } from "@mantine/core";
import { useState } from "react";
import { toast } from "sonner";
import { CourseFormProvider, useCourseForm } from "../hooks/FormContext";
import { CourseService } from "../services/coursesAPI";
import { NameInput } from "./NameInput";

const { POST_COURSE } = CourseService();
export default function CourseForm() {
  const [loading, setLoading] = useState(false);

  const form = useCourseForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? "Name is required" : null),
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      await POST_COURSE(values);
      toast.success("Course created successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CourseFormProvider form={form}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Group justify="flex-end" mt="md">
          <NameInput />
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </Group>
      </form>
    </CourseFormProvider>
  );
}
