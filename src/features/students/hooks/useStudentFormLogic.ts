"use client";

import type { Student } from "@/types/IStudent";
import { useEffect } from "react";
import { useStudentForm } from "./FormContext";

type Mode = "create" | "edit";

interface Props {
  mode: Mode;
  student?: Student | null;
  opened?: boolean
}

export function useStudentFormLogic({ mode, student , opened}: Props) {
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
        if (!value.trim()) return "Email is required";
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value) ? null : "Invalid email";
      },

      age: (value) => (value <= 0 ? "Age must be greater than 0" : null),

      course: (value) => (!value ? "Course is required" : null),
    },
  });

  useEffect(() => {
    if (mode === "edit" && student && opened) {
      form.setValues({
        name: student.name ?? "",
        email: student.email ?? "",
        age: student.age ?? 0,
        course: student.course ? String(student.course) : "",
      });
    }
  }, [mode, student, form.setValues, opened]);

  const resetForm = () => {
    form.reset();
  };

  return { form, resetForm };
}
