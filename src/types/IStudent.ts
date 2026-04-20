import type { Course } from "./ICourse";

export type Student = {
  id: number;
  name: string;
  email: string;
  course: Course;
  age: number;
};
