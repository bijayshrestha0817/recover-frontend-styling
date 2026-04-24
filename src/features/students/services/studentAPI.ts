import wretch from "wretch";
import type { ApiResponse } from "@/types/IApiResponse";
import type { Student, StudentList } from "@/types/IStudent";
import { handleApi } from "../../../lib/error";
import type { CourseDropdownResponse } from "../../../types/ICourse";

const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

const API_URL = wretch(API_BASE_URL)
  .accept("application/json")
  .content("application/json");

const GET_STUDENTS = (page: number) => {
  return handleApi(
    API_URL.url(`/students/?page=${page}`)
      .get()
      .json<ApiResponse<StudentList>>(),
  );
};

const POST_STUDENT = (data: {
  name: string;
  email: string;
  age: number;
  course: string;
}) => {
  return handleApi(
    API_URL.url("/students/").post(data).json<ApiResponse<Student>>(),
  );
};

const UPDATE_STUDENT = (data: {
  id: number;
  name: string;
  email: string;
  age: number | null;
  course: string;
}) => {
  return handleApi(
    API_URL.url(`/students/${data.id}/`).put(data).json<Student>(),
  );
};

const DELETE_STUDENT = (data: { id: number }) => {
  return handleApi(API_URL.url(`/students/${data.id}/`).delete().res());
};

const GET_COURSES_FOR_STUDENT = () => {
  return handleApi(
    API_URL.url(`/courses/all/`).get().json<CourseDropdownResponse>(),
  );
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
