import wretch, { type Wretch, type WretchError } from "wretch";
import { AuthService } from "../services/authAPI";

const { handleJWTRefresh, getToken, storeToken } = AuthService();

const api = () => {
  const access = getToken("access");

  return wretch(process.env.NEXT_API_BASE_URL_DEVELOPMENT)
    .auth(access ? `Bearer ${access}` : "")
    .catcher(401, async (_error: WretchError, request: Wretch) => {
      try {
        const refresh = getToken("refresh");

        if (!refresh) {
          throw new Error("No refresh token");
        }

        const data = await handleJWTRefresh(refresh).json<{
          access: string;
        }>();

        storeToken(data.access, "access");

        return request
          .auth(`Bearer ${data.access}`)
          .fetch()
          .unauthorized(() => {
            window.location.replace("/");
          })
          .json();
      } catch (err) {
        console.error("Refresh failed:", err);
        window.location.replace("/");
      }
    });
};
export const fetcher = async <T = unknown>(url: string): Promise<T> => {
  return api().url(url).get().json<T>();
};
