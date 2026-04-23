import wretch from "wretch";
import { handleApi } from "@/lib/error";
import type { ApiResponse } from "@/types/IApiResponse";
import type { Course, CourseList } from "@/types/ICourse";

const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

const API_URL = wretch(API_BASE_URL)
  .accept("application/json")
  .content("application/json");

const GET_COURSES = (page: number) => {
  return handleApi(
    API_URL.url(`/courses/?page=${page}`).get().json<ApiResponse<CourseList>>(),
  );
};

const POST_COURSE = (data: { name: string }) => {
  return handleApi(
    API_URL.url("/courses/").post(data).json<ApiResponse<Course>>(),
  );
};

const UPDATE_COURSE = (data: { id: number; name: string }) => {
  return handleApi(
    API_URL.url(`/courses/${data.id}/`).put(data).json<ApiResponse<Course>>(),
  );
};

const DELETE_COURSE = (data: { id: number }) => {
  return handleApi(API_URL.url(`/courses/${data.id}/`).delete().res());
};

export const CourseService = () => ({
  GET_COURSES,
  POST_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
});
