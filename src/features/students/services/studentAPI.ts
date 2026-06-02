import { handleApi } from "@/lib/error";
import { apiClient } from "@/lib/http/client";
import { listOrEmpty } from "@/lib/http/list";
import type { ApiResponse } from "@/types/IApiResponse";
import type { CourseDropdownResponse } from "@/types/ICourse";
import type { Student, StudentList } from "@/types/IStudent";

const GET_STUDENTS = (page: number) => {
  return listOrEmpty(
    handleApi(
      apiClient.get<ApiResponse<StudentList>>(`/students/?page=${page}`),
    ),
    "No Student Found",
  );
};

const POST_STUDENT = (data: {
  name: string;
  email: string;
  age: number;
  course: string;
}) => {
  return handleApi(apiClient.post<ApiResponse<Student>>("/students/", data));
};

const UPDATE_STUDENT = (data: {
  id: number;
  name: string;
  email: string;
  age: number | null;
  course: string;
}) => {
  return handleApi(
    apiClient.put<ApiResponse<Student>>(`/students/${data.id}/`, data),
  );
};

const DELETE_STUDENT = (data: { id: number }) => {
  return handleApi(apiClient.delete(`/students/${data.id}/`));
};

const GET_COURSES_FOR_STUDENT = () => {
  return handleApi(apiClient.get<CourseDropdownResponse>(`/courses/all/`));
};

export const StudentService = () => {
  return {
    GET_STUDENTS,
    POST_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT,
    GET_COURSES_FOR_STUDENT,
  };
};
