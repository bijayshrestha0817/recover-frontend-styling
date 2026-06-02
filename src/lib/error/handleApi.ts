import type { AxiosResponse } from "axios";
import { extractApiMessage } from "./extractApiMessage";
import type { NormalizedApiError } from "./types";

type AxiosErrorShape = {
  response?: {
    data?: {
      code?: string;
      errors?: unknown;
      [key: string]: unknown;
    };
    status?: number;
  };
};

// Unwraps an axios response to its body (`res.data`) and normalizes any error
// into a NormalizedApiError carrying the backend message, code, status, and body.
export async function handleApi<T>(
  promise: Promise<AxiosResponse<T>>,
): Promise<T> {
  try {
    const res = await promise;
    return res.data;
  } catch (error: unknown) {
    const err = error as AxiosErrorShape;

    const message = extractApiMessage(error);

    const apiError = new Error(message) as Error & NormalizedApiError;

    const data = err.response?.data;

    apiError.code = data?.code;
    apiError.status = err.response?.status;
    apiError.errors = data;

    throw apiError;
  }
}
