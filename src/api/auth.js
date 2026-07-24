import request from "./client";

export const superAdminLogin = ({ email, password }) =>
  request("/auth/superadmin/login", { method: "POST", body: { email, password } });
