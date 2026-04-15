import wretch from "wretch";

const API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

const API_AUTH_URL = process.env.NEXT_PUBLIC_DJANGO_AUTH_API_URL;
console.log(API_AUTH_URL);

const API_URL = wretch(API_BASE_URL)
  .accept("application/json")
  .content("application/json");

const AUTH_URL = wretch(API_AUTH_URL)
  .accept("application/json")
  .content("application/json");

const register = (email: string, username: string, password: string) => {
  return API_URL.post({ email, username, password }, "/auth/users/");
};

const login = (username: string, password: string) => {
  return AUTH_URL.post({ username: username, password }, "/auth/token/");
};

const handleJWTRefresh = (refreshToken: string) => {
  return AUTH_URL.post({ refresh: refreshToken }, "/auth/token/refresh/");
};

const getToken = (key: "access" | "refresh") => {
  return localStorage.getItem(key);
};

const storeToken = (token: string, key: "access" | "refresh") => {
  localStorage.setItem(key, token);
};

export const AuthService = () => {
  return {
    login,
    register,
    handleJWTRefresh,
    getToken,
    storeToken,
  };
};
