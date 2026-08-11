import request from "./client";

export const superAdminLogin = ({ email, password }) =>
  request("/auth/superadmin/login", { 
    method: "POST", 
    body: { email, password } 
  });

export const getCurrentSuperAdmin = () =>
  request("/auth/superadmin/me");

export const logout = () =>
  request("/auth/logout", { method: "POST" });