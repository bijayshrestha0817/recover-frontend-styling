import { handleApi } from "@/lib/error";
import { authClient } from "@/lib/http/client";
import type { ApiResponse } from "@/types/IApiResponse";
import type {
  ChangePasswordResponse,
  ForgotPassword,
  ForgotPasswordConfirmResponse,
} from "@/types/IAuth";

const changePassword = (current_password: string, new_password: string) => {
  return handleApi(
    authClient.put<ApiResponse<ChangePasswordResponse>>(
      "/auth/change-password/",
      { current_password, new_password },
    ),
  );
};

const forgotPassword = (email: string) => {
  return handleApi(
    authClient.post<ApiResponse<ForgotPassword>>("/auth/reset-password/", {
      email,
    }),
  );
};

const forgotPasswordConfirm = (
  uid: string,
  token: string,
  new_password: string,
) => {
  return handleApi(
    authClient.post<ApiResponse<ForgotPasswordConfirmResponse>>(
      "/auth/reset-password-confirm/",
      { uid, token, new_password },
    ),
  );
};

export const AuthService = () => {
  return {
    changePassword,
    forgotPassword,
    forgotPasswordConfirm,
  };
};
