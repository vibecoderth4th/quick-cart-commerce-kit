
import React, { createContext, useContext, useState, useEffect } from "react";
import { AdminSession } from "@/types";

type AdminSessionContextType = {
  session: AdminSession;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AdminSessionContext = createContext<AdminSessionContextType | undefined>(undefined);

export const AdminSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<AdminSession>({ isLoggedIn: false });

  // Check for existing session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem("adminSession");
    if (savedSession) {
      try {
        setSession(JSON.parse(savedSession));
      } catch (error) {
        console.error("Failed to parse admin session from localStorage", error);
      }
    }
  }, []);

  // Save session to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("adminSession", JSON.stringify(session));
  }, [session]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // TODO: In a real app, this would validate against an API
    if (email === "admin@example.com" && password === "password") {
      setSession({ isLoggedIn: true, email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setSession({ isLoggedIn: false });
  };

  const value = {
    session,
    login,
    logout,
  };

  return <AdminSessionContext.Provider value={value}>{children}</AdminSessionContext.Provider>;
};

export const useAdminSession = () => {
  const context = useContext(AdminSessionContext);
  if (context === undefined) {
    throw new Error("useAdminSession must be used within an AdminSessionProvider");
  }
  return context;
};
