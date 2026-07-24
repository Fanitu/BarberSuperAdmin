import request from "./client";

export const listShops = (token) => request("/superadmin/shops", { token });

export const createShop = (token, { name, ownerName, ownerPhone }) =>
  request("/superadmin/shops", { method: "POST", token, body: { name, ownerName, ownerPhone } });

export const deactivateShop = (token, id) =>
  request(`/superadmin/shops/${id}/deactivate`, { method: "PATCH", token });

export const createShopAdmin = (token, shopId, { name, password }) =>
  request(`/superadmin/shops/${shopId}/admins`, {
    method: "POST",
    token,
    body: { name, password },
  });
