import type { Student } from "@/types/IStudent";
import wretch from "wretch";

const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

const API_URL = wretch(API_BASE_URL)
  .accept("application/json")
  .content("application/json");

interface StudentResponse {
  count: number;
  results: Student[];
}

const GET_STUDENTS = (page: number) => {
  return API_URL.url(`/students/?page=${page}`).get().json<StudentResponse>();
};

const POST_STUDENT = (data: { name: string }) => {
  return API_URL.url("/students/").post(data).json<Student>();
};

const UPDATE_STUDENT = (data: { id: number; name: string }) => {
  return API_URL.url(`/students/${data.id}/`).put(data).json<Student>();
};

const DELETE_STUDENT = (data: { id: number }) => {
  return API_URL.url(`/students/${data.id}/`).delete().res();
};

export const CourseService = () => {
  return {
    GET_STUDENTS,
    POST_STUDENT,
    UPDATE_STUDENT,
    DELETE_STUDENT,
  };
};
