import React from "react";

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.container}>
      
      {/* Lado esquerdo */}
      <div>
        <h2 style={styles.title}>Dashboard</h2>
        <span style={styles.subtitle}>
          Olá, {user?.email || "Usuário"}
        </span>
      </div>

      {/* Lado direito */}
      <div style={styles.right}>

        {/* Status */}
        <div style={styles.status}>
          <span style={styles.dot}></span>
          Sistema Online
        </div>

        {/* Avatar */}
        <div style={styles.avatar}>
          {user?.email?.charAt(0).toUpperCase() || "U"}
        </div>

        {/* Botão logout */}
        <button
          style={styles.button}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          Sair
        </button>

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
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  title: {
    margin: 0,
    color: "#fff",
  },
  subtitle: {
    fontSize: "13px",
    color: "#cbd5e1",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
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
  },
  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background: "#38bdf8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    padding: "8px 12px",
    background: "#ef4444",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
  },
};