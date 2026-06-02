import Cookies from "js-cookie";
import wretch from "wretch";
import { handleApi, type NormalizedApiError } from "@/lib/error";
import type { ApiResponse } from "@/types/IApiResponse";
import type { Course, CourseList } from "@/types/ICourse";

const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

// The backend returns 404 for an empty list. On a collection endpoint a 404 just
// means "no rows", so surface it as an empty page instead of an error.
const EMPTY_COURSE_PAGE: ApiResponse<CourseList> = {
  data: { count: 0, next: null, previous: null, results: [] },
  message: "No Course Found",
  success: true,
  errors: null,
  code: "success",
  status: 200,
};

const API_URL = () => {
  const token = Cookies.get("access_token");

  return wretch(API_BASE_URL)
    .auth(`Bearer ${token}`)
    .accept("application/json")
    .content("application/json");
};

const GET_COURSES = async (page: number) => {
  try {
    return await handleApi(
      API_URL()
        .url(`/courses/?page=${page}`)
        .get()
        .json<ApiResponse<CourseList>>(),
    );
  } catch (error) {
    if ((error as NormalizedApiError)?.status === 404) {
      return EMPTY_COURSE_PAGE;
    }
    throw error;
  }
};

const POST_COURSE = (data: { name: string }) => {
  return handleApi(
    API_URL().url("/courses/").post(data).json<ApiResponse<Course>>(),
  );
};

const UPDATE_COURSE = (data: { id: number; name: string }) => {
  return handleApi(
    API_URL().url(`/courses/${data.id}/`).put(data).json<ApiResponse<Course>>(),
  );
};

const DELETE_COURSE = (data: { id: number }) => {
  return handleApi(API_URL().url(`/courses/${data.id}/`).delete().res());
};

export const CourseService = () => ({
  GET_COURSES,
  POST_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
});
