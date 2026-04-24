export type Student = {
  id: number;
  name: string;
  email: string;
  age: number;
  course_name: string;
  course?: string;
};

export type StudentList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Student[];
};
