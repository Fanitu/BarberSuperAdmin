import { createContext, useContext, useEffect, useState } from "react";
import { superAdminLogin, getCurrentSuperAdmin } from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Check if super admin is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const data = await getCurrentSuperAdmin();
      setUser(data.user);
    } catch (err) {
      // Not authenticated - this is normal
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoggingIn(true);
    setLoginError("");
    try {
      const data = await superAdminLogin({ email, password });
      setUser(data.user);
      return true;
    } catch (err) {
      setLoginError(err.message);
      return false;
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      // You might want to add a logout endpoint for super admin too
      await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}/auth/logout`, {
        method: "POST",
        credentials: 'include'
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuthenticated: Boolean(user),
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