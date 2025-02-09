import React from "react";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { loginUser } from "../services/authService";
import { AuthContextType } from "../types";
import { fakeDB } from "../mock-api/fakeDatabase";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [pendingRequests, setPendingRequests] = useState<number>(0);

  const updatePendingRequests = () => {
    if (!user) {
      setPendingRequests(0);
      return;
    }
    const currentUser = fakeDB.findUser(user);
    
    setPendingRequests(currentUser ? currentUser.friendRequests.length : 0);
  };  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    updatePendingRequests();
  }, [user]);
  

  const login = async (name: string): Promise<boolean> => {
    const response = await loginUser(name);
    if (response.success && response.token) {
      setUser(name);
      setToken(response.token);
      localStorage.setItem("user", name);
      localStorage.setItem("token", response.token);
      updatePendingRequests();
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setPendingRequests(0);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, pendingRequests, updatePendingRequests }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
