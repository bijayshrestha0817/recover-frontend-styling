import type { NormalizedApiError } from "@/lib/error";
import type { ApiResponse } from "@/types/IApiResponse";

// A DRF-style paginated collection. StudentList / CourseList are instances of this shape.
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

// An empty page wrapped in the standard success envelope.
function emptyPage<T>(message: string): ApiResponse<Paginated<T>> {
  return {
    data: { count: 0, next: null, previous: null, results: [] as T[] },
    message,
    success: true,
    errors: null,
    code: "success",
    status: 200,
  };
}

// The backend returns 404 ("No X Found") for an EMPTY collection. On a list endpoint a
// 404 just means "no rows", so resolve it to an empty page; any other error propagates.
// Single source of truth for the empty-list semantics shared by every paginated service.
export async function listOrEmpty<T>(
  request: Promise<ApiResponse<Paginated<T>>>,
  emptyMessage: string,
): Promise<ApiResponse<Paginated<T>>> {
  try {
    return await request;
  } catch (error) {
    if ((error as NormalizedApiError)?.status === 404) {
      return emptyPage<T>(emptyMessage);
    }
    throw error;
  }
}
