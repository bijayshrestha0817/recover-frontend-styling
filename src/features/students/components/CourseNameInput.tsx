"use client";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useStudentFormContext } from "../hooks/FormContext";
import { StudentService } from "../services/studentAPI";

const { GET_COURSES_FOR_STUDENT } = StudentService();

export function CourseNameInput() {
  const form = useStudentFormContext();

  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: GET_COURSES_FOR_STUDENT,
  });

  const options =
    data?.data?.map((course) => ({
      value: String(course.id),
      label: course.name,
    })) ?? [];

  return (
    <Select
      label="Course"
      placeholder="Select course"
      data={options}
      searchable
      nothingFoundMessage="No courses"
      disabled={isLoading}
      {...form.getInputProps("course")}
    />
  );
}
