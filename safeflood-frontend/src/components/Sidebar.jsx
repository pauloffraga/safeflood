import React from 'react';

export default function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Logo / Brand */}
      <div className="logo">
        <span className="logo-icon">🌊</span>
        <h2>SafeFlood</h2>
      </div>

      {/* Menu */}
      <nav className="menu">

        <a className="active" href="#">
           Dashboard
        </a>

        <a href="#">
           Alertas
        </a>

        <a href="#">
           Regiões
        </a>

        <a href="#">
           Configurações
        </a>

      </nav>

      {/* Status inferior */}
      <div className="sidebar-footer">
        <div className="status-dot" />
        <span>Sistema ativo</span>
      </div>

    </aside>
  );
}