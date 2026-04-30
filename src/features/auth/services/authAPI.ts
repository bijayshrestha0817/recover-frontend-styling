import Cookies from "js-cookie";
import wretch from "wretch";


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
  return getAuth().put({ current_password, new_password }, "/auth/change-password/")
}

const forgotPassword = (email: string) => {
  return AUTH_URL.post({ email, }, "/auth/reset-password/");
};

const forgotPasswordConfirm = (uid: string, token: string, new_password: string) => {
  return AUTH_URL.post({ uid, token, new_password }, "/auth/forgot-password-confirm/")
}

export const AuthService = () => {
  return {
    changePassword,
    forgotPassword,
    forgotPasswordConfirm
  };
};
