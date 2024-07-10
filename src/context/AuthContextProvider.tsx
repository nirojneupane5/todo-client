import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("access_token");
    return !!token;
  });
  const decodeToken = (token: string): string | null => {
    try {
      const decoded: { user_id: string } = jwtDecode(token);
      return decoded.user_id;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };
  const [userId, setUserId] = useState<string | null>(() => {
    const token = localStorage.getItem("access_token");
    return token ? decodeToken(token) : null;
  });

  const login = (token: string) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
    setUserId(decodeToken(token));
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setUserId(null);
  };

  const checkAuth = () => {
    const token = localStorage.getItem("access_token");
    return !!token;
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setUserId(decodeToken(token));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
