import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;
const AUTH_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_AUTH_API_URL;

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

// Single-flight refresh: many requests can 401 at once (e.g. a page that fires
// several queries). The first 401 starts ONE refresh; the rest await the same
// promise, then all retry with the new token. Avoids a stampede of refresh calls.
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refresh = Cookies.get("refresh_token");
  if (!refresh) throw new Error("No refresh token");

  // Bare axios (not an intercepted instance) so the refresh call can't recurse
  // through this same 401 handler.
  const { data } = await axios.post<{ access: string }>(
    `${AUTH_BASE_URL}/auth/token/refresh/`,
    { refresh },
  );

  Cookies.set("access_token", data.access, {
    secure: true,
    sameSite: "strict",
  });

  return data.access;
}

function handleRefreshFailure() {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

function attachInterceptors(instance: AxiosInstance): AxiosInstance {
  // Attach the current access token per request, so a token refreshed mid-session
  // is always used.
  instance.interceptors.request.use((config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const original = error.config as RetriableConfig | undefined;
      const status = error.response?.status;
      const url = original?.url ?? "";

      // Only handle a 401 once, and never for the token endpoints themselves.
      if (
        status !== 401 ||
        !original ||
        original._retry ||
        url.includes("/auth/token/")
      ) {
        return Promise.reject(error);
      }

      original._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
          });
        }
        const newToken = await refreshPromise;
        original.headers.Authorization = `Bearer ${newToken}`;
        return instance(original);
      } catch {
        handleRefreshFailure();
        return Promise.reject(error);
      }
    },
  );

  return instance;
}

// Versioned API (students, courses) and the auth/account API live on different
// base URLs but share the same auth + refresh behavior.
export const apiClient = attachInterceptors(
  axios.create({ baseURL: API_BASE_URL }),
);

export const authClient = attachInterceptors(
  axios.create({ baseURL: AUTH_BASE_URL }),
);
