import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { listShops, createShop, deactivateShop, createShopAdmin } from "../api/shops";
import styles from "./ShopsView.module.css";

const ShopsView = () => {
  const { token } = useAuth();
  const [shops, setShops] = useState([]);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [adminFormShopId, setAdminFormShopId] = useState(null);
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminStatus, setAdminStatus] = useState({ type: "", message: "" });

  const load = () => {
    listShops(token).then(setShops).catch((err) => setError(err.message));
  };

  useEffect(load, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await createShop(token, { name, ownerName, ownerPhone });
      setName("");
      setOwnerName("");
      setOwnerPhone("");
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await deactivateShop(token, id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const openAdminForm = (shopId) => {
    setAdminFormShopId(shopId);
    setAdminName("");
    setAdminPassword("");
    setAdminStatus({ type: "", message: "" });
  };

  const submitAdminForm = async (e, shopId) => {
    e.preventDefault();
    setAdminStatus({ type: "", message: "" });
    try {
      await createShopAdmin(token, shopId, { name: adminName, password: adminPassword });
      setAdminStatus({ type: "success", message: "Admin account created." });
      setAdminFormShopId(null);
    } catch (err) {
      setAdminStatus({ type: "error", message: err.message });
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Barber Shops</h2>

      <form onSubmit={handleCreate} className={styles.form}>
        <h3 className={styles.formTitle}>New Shop</h3>
        <label className={styles.label}>
          Shop Name
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Owner Name
          <input
            className={styles.input}
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Owner Phone
          <input
            className={styles.input}
            type="tel"
            value={ownerPhone}
            onChange={(e) => setOwnerPhone(e.target.value)}
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.submitBtn} type="submit" disabled={submitting}>
          {submitting ? "Creating…" : "Create Shop & Generate Code"}
        </button>
      </form>

      <h3 className={styles.subheading}>All Shops</h3>

      <ul className={styles.list}>
        {shops.map((shop) => (
          <li key={shop._id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.shopName}>{shop.name}</span>
              <span
                className={`${styles.statusBadge} ${
                  shop.isActive ? styles.active : styles.inactive
                }`}
              >
                {shop.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className={styles.codeRow}>
              <span className={styles.codeLabel}>Barber Code</span>
              <span className={`${styles.codeValue} mono-figure`}>{shop.barberCode}</span>
            </div>

            {shop.ownerName && <p className={styles.meta}>Owner: {shop.ownerName}</p>}

            <div className={styles.cardActions}>
              <button
                className={styles.actionBtn}
                onClick={() => openAdminForm(shop._id)}
              >
                Create Admin Login
              </button>
              {shop.isActive && (
                <button
                  className={styles.deactivateBtn}
                  onClick={() => handleDeactivate(shop._id)}
                >
                  Deactivate
                </button>
              )}
            </div>

            {adminFormShopId === shop._id && (
              <form
                className={styles.adminForm}
                onSubmit={(e) => submitAdminForm(e, shop._id)}
              >
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Admin name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  required
                />
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
                {adminStatus.message && (
                  <p
                    className={
                      adminStatus.type === "error" ? styles.error : styles.success
                    }
                  >
                    {adminStatus.message}
                  </p>
                )}
                <div className={styles.adminFormActions}>
                  <button type="submit" className={styles.actionBtn}>
                    Save
                  </button>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => setAdminFormShopId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </li>
        ))}
        {shops.length === 0 && <li className={styles.empty}>No shops yet.</li>}
      </ul>
    </section>
  );
};

export default ShopsView;
