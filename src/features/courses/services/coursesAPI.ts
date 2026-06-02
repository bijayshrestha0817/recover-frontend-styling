import { handleApi } from "@/lib/error";
import { apiClient } from "@/lib/http/client";
import { listOrEmpty } from "@/lib/http/list";
import type { ApiResponse } from "@/types/IApiResponse";
import type { Course, CourseList } from "@/types/ICourse";

const GET_COURSES = (page: number) => {
  return listOrEmpty(
    handleApi(apiClient.get<ApiResponse<CourseList>>(`/courses/?page=${page}`)),
    "No Course Found",
  );
};

const POST_COURSE = (data: { name: string }) => {
  return handleApi(apiClient.post<ApiResponse<Course>>("/courses/", data));
};

const UPDATE_COURSE = (data: { id: number; name: string }) => {
  return handleApi(
    apiClient.put<ApiResponse<Course>>(`/courses/${data.id}/`, data),
  );
};

const DELETE_COURSE = (data: { id: number }) => {
  return handleApi(apiClient.delete(`/courses/${data.id}/`));
};

export const CourseService = () => ({
  GET_COURSES,
  POST_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
});
