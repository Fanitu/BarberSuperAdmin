import styles from "./Header.module.css";

const Header = ({ user, onLoginClick, onLogout }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Super Admin</h1>

      <div className={styles.authArea}>
        {user ? (
          <>
            <span className={styles.userName}>{user.name}</span>
            <button className={styles.logoutBtn} onClick={onLogout}>
              Log out
            </button>
          </>
        ) : (
          <button className={styles.loginBtn} onClick={onLoginClick}>
            Log in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;