export type ApiErrorResponse = {
  message?: string;
  detail?: string;
  code?: string;
  errors?: unknown;
  [key: string]: unknown;
};

export type NormalizedApiError = {
  message: string;
  code?: string;
  status?: number;
  errors?: unknown;
};
