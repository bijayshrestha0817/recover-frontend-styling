export type ApiResponse<T> = {
  id: number;
  data: T;
  message: string;
  success: boolean;
  errors: unknown;
  code: string;
  status: number;
};
