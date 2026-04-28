"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/types/IUser";
import type { AuthContextType } from "../types/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me/", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });

      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const res = await api.post("/auth/token/", {
      username,
      password,
    });

    Cookies.set("access_token", res.data.access);
    Cookies.set("refresh_token", res.data.refresh);

    await loadUser();
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setUser(null);
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      const response = await api.post("/register/", {
        username,
        email,
        password,
      });

      return response.data;
    } catch (error: unknown) {
      console.error("Register failed:", error);

      const apiError = {
        message: "Registration failed",
      };

      throw apiError;
    }
  };

  useEffect(() => {
    loadUser();
  });

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside provider");
  return ctx;
};
