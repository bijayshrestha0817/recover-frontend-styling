import { createFormContext } from "@mantine/form";

interface CourseFormValues {
  name: string;
}

export const [CourseFormProvider, useCourseFormContext, useCourseForm] =
  createFormContext<CourseFormValues>();
