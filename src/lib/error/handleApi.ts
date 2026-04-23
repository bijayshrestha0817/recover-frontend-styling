import { extractApiMessage } from "./extractApiMessage";
import type { NormalizedApiError } from "./types";

type ErrorShape = {
  json?: {
    code?: string;
    errors?: unknown;
  };
  status?: number;
};

export async function handleApi<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (error: unknown) {
    const message = extractApiMessage(error);
    const err = error as ErrorShape;

    const apiError = new Error(message) as Error & NormalizedApiError;

    apiError.code = err?.json?.code;
    apiError.status = err?.status;
    apiError.errors = err?.json?.errors;

    return Promise.reject(apiError);
  }
}
