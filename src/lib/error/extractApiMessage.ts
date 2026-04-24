type ApiErrorResponse = {
  message?: string;
  detail?: string;
  [key: string]: unknown;
};

type ErrorShape = {
  json?: ApiErrorResponse;
  response?: {
    json?: ApiErrorResponse;
  };
  message?: string;
  status?: number;
};

function flattenErrors(obj: Record<string, unknown>): string {
  const messages: string[] = [];

  for (const value of Object.values(obj)) {
    if (Array.isArray(value)) {
      messages.push(...value.map(String));
    } else if (typeof value === "string") {
      messages.push(value);
    }
  }

  return messages.length > 0 ? messages.join(" | ") : "Something went wrong";
}

function tryParseJSON(value: string): string {
  try {
    const parsed = JSON.parse(value) as ApiErrorResponse;

    if (parsed.message || parsed.detail) {
      return parsed.message || parsed.detail || value;
    }

    return flattenErrors(parsed);
  } catch {
    return value;
  }
}

export function extractApiMessage(error: unknown): string {
  if (typeof error !== "object" || error === null) {
    return "Something went wrong";
  }

  const err = error as ErrorShape;

  const json = err.json || err.response?.json;

  if (json && typeof json === "object") {
    if (json.message || json.detail) {
      return json.message || json.detail || "Something went wrong";
    }

    return flattenErrors(json);
  }

  if (typeof err.message === "string") {
    return tryParseJSON(err.message);
  }

  return "Something went wrong";
}
