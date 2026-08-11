import request from "./client";

// No need to pass tokens anymore - cookies handle authentication
export const listShops = () => request("/superadmin/shops");

export const createShop = ({ name, ownerName, ownerPhone }) =>
  request("/superadmin/shops", { 
    method: "POST", 
    body: { name, ownerName, ownerPhone } 
  });

export const deactivateShop = (id) =>
  request(`/superadmin/shops/${id}/deactivate`, { method: "PATCH" });

export const createShopAdmin = (shopId, { name, password }) =>
  request(`/superadmin/shops/${shopId}/admins`, {
    method: "POST",
    body: { name, password },
  });