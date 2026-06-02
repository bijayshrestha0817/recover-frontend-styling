"use client";

import Cookies from "js-cookie";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { handleApi, type NormalizedApiError } from "@/lib/error";
import { authClient } from "@/lib/http/client";
import type { User } from "@/types/IUser";
import type { AuthContextType } from "../types/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
      // authClient attaches the Bearer token and handles refresh-on-401 centrally.
      const res = await authClient.get("/auth/me/");
      setUser(res.data.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await authClient.post("/auth/token/", {
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
    } catch (err: unknown) {
      const error = err as Error & NormalizedApiError;
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      const refresh = Cookies.get("refresh_token");
      await authClient.post("/auth/logout/", { refresh });
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
    password: string,
  ) => {
    return handleApi(
      authClient.post("/register/", { username, email, password }),
    );
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
