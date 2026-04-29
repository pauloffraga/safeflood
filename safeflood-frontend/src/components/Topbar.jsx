import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);
  const [notifications] = useState([
    "Nível da água subindo",
    "Alerta em Recife",
    "Sistema funcionando normalmente"
  ]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.container}>

      {/* ESQUERDA */}
      <div>
        <h2 style={styles.title}>Dashboard</h2>
        <span style={styles.subtitle}>
          Olá, {user?.email || "Usuário"}
        </span>
      </div>

      {/* DIREITA */}
      <div style={styles.right}>

        {/* STATUS */}
        <div style={styles.status}>
          <span style={styles.dot}></span>
          Online
        </div>

        {/* NOTIFICAÇÕES */}
        <div style={styles.notificationBox}>
          🔔
          {notifications.length > 0 && (
            <span style={styles.badge}>
              {notifications.length}
            </span>
          )}
        </div>

        {/* USUÁRIO */}
        <div style={styles.userBox} onClick={() => setOpen(!open)}>
          <div style={styles.avatar}>
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>

          <span style={styles.email}>
            {user?.email?.split("@")[0]}
          </span>
        </div>

        {/* DROPDOWN */}
        {open && (
          <div style={styles.dropdown}>
            <div style={styles.dropdownItem}>
              👤 Perfil
            </div>

            <div style={styles.dropdownItem}>
              ⚙️ Configurações
            </div>

            <div
              style={styles.logout}
              onClick={handleLogout}
            >
              🚪 Sair
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px",
    background: "rgba(15,23,42,0.7)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    color: "#fff",
    position: "relative",
  },

  title: {
    margin: 0,
    fontSize: "20px",
  },

  subtitle: {
    fontSize: "13px",
    color: "#94a3b8",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    position: "relative",
  },

  status: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#22c55e",
  },

  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
    animation: "pulse 1.5s infinite",
  },

  notificationBox: {
    position: "relative",
    fontSize: "18px",
    cursor: "pointer",
  },

  badge: {
    position: "absolute",
    top: "-5px",
    right: "-8px",
    background: "#ef4444",
    borderRadius: "50%",
    fontSize: "10px",
    padding: "3px 6px",
    color: "#fff",
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },

  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background: "#0ea5e9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  email: {
    fontSize: "13px",
    color: "#cbd5e1",
  },

  dropdown: {
    position: "absolute",
    top: "60px",
    right: "0",
    background: "#020617",
    borderRadius: "10px",
    padding: "10px",
    width: "180px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  dropdownItem: {
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#cbd5e1",
  },

  logout: {
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#ef4444",
  },
};