"use client";

import type { User } from "@/types/IUser";
import axios from "axios";
import Cookies from "js-cookie";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AuthContextType } from "../types/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DJANGO_AUTH_API_URL,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = Cookies.get("access_token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/auth/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const original = error.config;

        if (original?.url?.includes("/auth/token/")) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !original._retry) {
          original._retry = true;

          try {
            const refresh = Cookies.get("refresh_token");

            if (!refresh) {
              throw new Error("No refresh token");
            }

            const { data } = await api.post("/auth/token/refresh/", {
              refresh,
            });

            Cookies.set("access_token", data.access, {
              secure: true,
              sameSite: "strict",
            });

            original.headers.Authorization = `Bearer ${data.access}`;

            return api(original);
          } catch {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");

            if (window.location.pathname !== "/login") {
              window.location.href = "/login";
            }
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await api.post("/auth/token/", {
        username,
        password,
      });

      Cookies.set("access_token", res.data.access, {
        secure: true,
        sameSite: "strict",
        expires: 1,
      });

      Cookies.set("refresh_token", res.data.refresh, {
        secure: true,
        sameSite: "strict",
        expires: 7,
      });

      await loadUser();
    } catch (error) {
      {
        throw new Error("Invalid username or password");
      }
    }
  };

  const logout = async () => {
    try {
      const refresh = Cookies.get("refresh_token");
      await api.post("/auth/logout/", { refresh });
    } finally {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      setUser(null);
      window.location.href = "/login";
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await api.post("/register/", {
        username,
        email,
        password,
      });

      return response.data;
    } catch {
      throw new Error("Registration failed");
    }
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside provider");
  }

  return ctx;
};
