"use client";
import type { Course } from "@/types/ICourse";
import { useEffect } from "react";
import { useCourseForm } from "./FormContext";

type Mode = "create" | "edit";

interface CourseProps {
  mode: Mode;
  course?: Course | null;
  opened?: boolean;
}

export function useCourseFormLogic({ mode, course, opened }: CourseProps) {
  const form = useCourseForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? "Name is required" : null),
    },
  });
  useEffect(() => {
    if (mode === "edit" && course && opened) {
      form.setValues({
        name: course.name ?? "",
      });
    }
  }, [mode, course, form.setValues, opened]);

  const resetForm = () => {
    form.reset();
  };
  return { form, resetForm };
}
