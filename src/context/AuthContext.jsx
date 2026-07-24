import { createContext, useContext, useEffect, useState } from "react";
import { superAdminLogin } from "../api/auth";

const AuthContext = createContext(null);
const STORAGE_KEY = "bms-superadmin-session";

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [session]);

  const login = async ({ email, password }) => {
    setLoggingIn(true);
    setLoginError("");
    try {
      const data = await superAdminLogin({ email, password });
      setSession(data);
      return true;
    } catch (err) {
      setLoginError(err.message);
      return false;
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = () => setSession(null);

  return (
    <AuthContext.Provider
      value={{
        token: session?.token,
        user: session?.user,
        isAuthenticated: Boolean(session?.token),
        login,
        logout,
        loginError,
        loggingIn,
        clearLoginError: () => setLoginError(""),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
