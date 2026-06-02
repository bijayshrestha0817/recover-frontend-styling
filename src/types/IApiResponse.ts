export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
  errors: unknown;
  code: string;
  status: number;
};
