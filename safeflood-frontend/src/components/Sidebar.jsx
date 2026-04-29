import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>

      {/* LOGO */}
      <div style={styles.logo}>
        <span style={styles.icon}>🌊</span>
        <h2>SafeFlood</h2>
      </div>

      {/* MENU */}
      <nav style={styles.menu}>

        <NavLink to="/dashboard" style={styles.link} className="nav">
          📊 Dashboard
        </NavLink>

        <NavLink to="/alerts" style={styles.link} className="nav">
          🚨 Alertas
        </NavLink>

        <NavLink to="/regions" style={styles.link} className="nav">
          📍 Regiões
        </NavLink>

        <NavLink to="/settings" style={styles.link} className="nav">
          ⚙️ Configurações
        </NavLink>

      </nav>

      {/* FOOTER */}
      <div style={styles.footer}>
        <div style={styles.statusDot}></div>
        <span>Sistema ativo</span>
      </div>

    </aside>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    height: "100vh",
    background: "#020617",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
    borderRight: "1px solid rgba(255,255,255,0.05)",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "30px",
  },

  icon: {
    fontSize: "24px",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  link: {
    padding: "12px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#cbd5e1",
    transition: "0.2s",
  },

  footer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#22c55e",
  },

  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
  },
};