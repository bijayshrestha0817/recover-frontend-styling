export type Course = {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type CourseList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Course[];
};

export type CourseDropdownResponse = {
  data: Course[];
  message: string;
  success: boolean;
  errors: null;
  code: string;
};
