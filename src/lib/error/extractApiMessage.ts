type ApiErrorResponse = {
  message?: string;
  detail?: string;
};

type ErrorShape = {
  json?: ApiErrorResponse;
  response?: {
    json?: ApiErrorResponse;
  };
  message?: string;
};

function tryParseJSON(value: string): string {
  try {
    const parsed = JSON.parse(value) as ApiErrorResponse;

    return parsed.message || parsed.detail || value;
  } catch {
    return value;
  }
}

export function extractApiMessage(error: unknown): string {
  if (typeof error !== "object" || error === null) {
    return "Something went wrong";
  }

  const err = error as ErrorShape;

  const rawMessage =
    err.json?.message ||
    err.json?.detail ||
    err.response?.json?.message ||
    err.response?.json?.detail ||
    err.message;

  if (!rawMessage) {
    return "Something went wrong";
  }

  if (typeof rawMessage === "string") {
    return tryParseJSON(rawMessage);
  }

  return "Something went wrong";
}
