import { extractApiMessage } from "./extractApiMessage";
import type { NormalizedApiError } from "./types";

type ErrorShape = {
  json?: {
    code?: string;
    errors?: unknown;
    [key: string]: unknown;
  };
  response?: {
    json?: {
      code?: string;
      errors?: unknown;
      [key: string]: unknown;
    };
  };
  status?: number;
};

export async function handleApi<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (error: unknown) {
    const err = error as ErrorShape;

    const message = extractApiMessage(error);

    const apiError = new Error(message) as Error & NormalizedApiError;

    const json = err.json || err.response?.json;

    apiError.code = json?.code;
    apiError.status = err?.status;
    apiError.errors = json;

    throw apiError;
  }
}
