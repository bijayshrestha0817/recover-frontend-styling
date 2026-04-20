import { createFormContext } from "@mantine/form";

interface StudentFormValues {
  name: string;
  email: string;
  age: number;
  course: string;
}

export const [StudentFormProvider, useStudentFormContext, useStudentForm] =
  createFormContext<StudentFormValues>();
