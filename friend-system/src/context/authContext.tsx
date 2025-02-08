import { createContext, useState, useContext, ReactNode } from "react";
import { loginUser } from "../services/authService";

interface AuthContextType {
  user: string | null;
  login: (name: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = async (name: string): Promise<boolean> => {
    const isValidUser = await loginUser(name);
    if (isValidUser) {
      setUser(name);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
