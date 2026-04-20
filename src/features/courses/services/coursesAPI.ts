import wretch from "wretch";
import type { Course } from "@/types/ICourse";

const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

const API_URL = wretch(API_BASE_URL)
  .accept("application/json")
  .content("application/json");

interface CourseResponse {
  count: number;
  results: Course[];
}

const GET_COURSES = (page: number) => {
  return API_URL.url(`/courses/?page=${page}`).get().json<CourseResponse>();
};

const POST_COURSE = (data: { name: string }) => {
  return API_URL.url("/courses/").post(data).json<Course>();
};

const UPDATE_COURSE = (data: { id: number; name: string }) => {
  return API_URL.url(`/courses/${data.id}/`).put(data).json<Course>();
};

const DELETE_COURSE = (data: { id: number }) => {
  return API_URL.url(`/courses/${data.id}/`).delete().res();
};

export const CourseService = () => {
  return {
    GET_COURSES,
    POST_COURSE,
    UPDATE_COURSE,
    DELETE_COURSE,
  };
};
