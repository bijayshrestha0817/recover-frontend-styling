import wretch from "wretch";
import type { Course } from "@/types/ICourse";
import type { Student } from "@/types/IStudent";

const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

const API_URL = wretch(API_BASE_URL)
  .accept("application/json")
  .content("application/json");

interface StudentResponse {
  count: number;
  results: Student[];
}

const GET_STUDENTS = (page: number) => {
  return API_URL.url(`/students/?page=${page}`)
    .get()
    .json<StudentResponse>()
    .catch((error) => {
      console.error("Error fetching students:", error);
      throw error;
    });
};

const POST_STUDENT = (data: {
  name: string;
  email: string;
  age: number;
  course: string;
}) => {
  return API_URL.url("/students/")
    .post(data)
    .json<Student>()
    .catch((error) => {
      console.error("Error creating student:", error);
      throw error;
    });
};

const UPDATE_STUDENT = (data: {
  id: number;
  name: string;
  email: string;
  age: number | null;
  course: string;
}) => {
  return API_URL.url(`/students/${data.id}/`)
    .put(data)
    .json<Student>()
    .catch((error) => {
      console.error("Error updating student:", error);
      throw error;
    });
};

const DELETE_STUDENT = (data: { id: number }) => {
  return API_URL.url(`/students/${data.id}/`)
    .delete()
    .res()
    .catch((error) => {
      console.error("Error deleting student:", error);
      throw error;
    });
};

const GET_COURSES_FOR_STUDENT = () => {
  return API_URL.url(`/courses/all/`)
    .get()
    .json<Course[]>()
    .catch((error) => {
      console.error("Error fetching courses:", error);
      throw error;
    });
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
