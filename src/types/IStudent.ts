export type Student = {
  id: number;
  name: string;
  email: string;
  age: number;
  course_name: string;
  course?: number;
};

export type StudentList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Student[];
};
