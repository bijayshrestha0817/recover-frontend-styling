import Cookies from "js-cookie";
import wretch from "wretch";
import { handleApi } from "@/lib/error";
import type { ApiResponse } from "@/types/IApiResponse";
import type {
  ChangePasswordResponse,
  ForgotPassword,
  ForgotPasswordConfirmResponse,
} from "@/types/IAuth";

const API_AUTH_URL = process.env.NEXT_PUBLIC_DJANGO_AUTH_API_URL;

const AUTH_URL = wretch(API_AUTH_URL)
  .accept("application/json")
  .content("application/json");

const getAuth = () => {
  const token = Cookies.get("access_token");

  return wretch(API_AUTH_URL)
    .auth(`Bearer ${token}`)
    .accept("application/json")
    .content("application/json");
};

const changePassword = (current_password: string, new_password: string) => {
  return handleApi(
    getAuth()
      .put({ current_password, new_password }, "/auth/change-password/")
      .json<ApiResponse<ChangePasswordResponse>>(),
  );
};

const forgotPassword = (email: string) => {
  return handleApi(
    AUTH_URL.post({ email }, "/auth/reset-password/").json<
      ApiResponse<ForgotPassword>
    >(),
  );
};

const forgotPasswordConfirm = (
  uid: string,
  token: string,
  new_password: string,
) => {
  return handleApi(
    AUTH_URL.post(
      { uid, token, new_password },
      "/auth/reset-password-confirm/",
    ).json<ApiResponse<ForgotPasswordConfirmResponse>>(),
  );
};

export const AuthService = () => {
  return {
    changePassword,
    forgotPassword,
    forgotPasswordConfirm,
  };
};
