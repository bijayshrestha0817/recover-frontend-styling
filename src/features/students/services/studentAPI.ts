import Cookies from "js-cookie";
import wretch from "wretch";
import type { ApiResponse } from "@/types/IApiResponse";
import type { Student, StudentList } from "@/types/IStudent";
import { handleApi, type NormalizedApiError } from "../../../lib/error";
import type { CourseDropdownResponse } from "../../../types/ICourse";

// The backend returns 404 ("No Student Found") for an empty list. On a collection
// endpoint a 404 just means "no rows", so surface it as an empty page instead of an error.
const EMPTY_STUDENT_PAGE: ApiResponse<StudentList> = {
  data: { count: 0, next: null, previous: null, results: [] },
  message: "No Student Found",
  success: true,
  errors: null,
  code: "success",
  status: 200,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

// Student endpoints require JWT (see docs/API.md). Read the token lazily per call
// so a refreshed access token is always picked up.
const API_URL = () => {
  const token = Cookies.get("access_token");

  return wretch(API_BASE_URL)
    .auth(`Bearer ${token}`)
    .accept("application/json")
    .content("application/json");
};

const GET_STUDENTS = async (page: number) => {
  try {
    return await handleApi(
      API_URL()
        .url(`/students/?page=${page}`)
        .get()
        .json<ApiResponse<StudentList>>(),
    );
  } catch (error) {
    if ((error as NormalizedApiError)?.status === 404) {
      return EMPTY_STUDENT_PAGE;
    }
    throw error;
  }
};

const POST_STUDENT = (data: {
  name: string;
  email: string;
  age: number;
  course: string;
}) => {
  return handleApi(
    API_URL().url("/students/").post(data).json<ApiResponse<Student>>(),
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
    API_URL()
      .url(`/students/${data.id}/`)
      .put(data)
      .json<ApiResponse<Student>>(),
  );
};

const DELETE_STUDENT = (data: { id: number }) => {
  return handleApi(API_URL().url(`/students/${data.id}/`).delete().res());
};

const GET_COURSES_FOR_STUDENT = () => {
  return handleApi(
    API_URL().url(`/courses/all/`).get().json<CourseDropdownResponse>(),
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
