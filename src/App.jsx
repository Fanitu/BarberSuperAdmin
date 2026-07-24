import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import ShopsView from "./components/ShopsView";
import "./App.css";

function App() {
  const { user, isAuthenticated, login, logout, loginError, loggingIn, clearLoginError } =
    useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLoginSubmit = async (credentials) => {
    const success = await login(credentials);
    if (success) setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    clearLoginError();
  };

  return (
    <div className="app">
      <Header user={user} onLoginClick={() => setModalOpen(true)} onLogout={logout} />

      {isAuthenticated ? (
        <main>
          <ShopsView />
        </main>
      ) : (
        <main className="empty-state">
          <p>Log in with your super admin email and password to manage barber shops.</p>
        </main>
      )}

      {modalOpen && (
        <LoginModal
          onClose={closeModal}
          onSubmit={handleLoginSubmit}
          error={loginError}
          loading={loggingIn}
        />
      )}
    </div>
  );
}

export default App;
