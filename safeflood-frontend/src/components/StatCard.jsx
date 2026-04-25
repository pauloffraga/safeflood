import React from 'react';

export default function StatCard({ icon, label, value, color }) {
  return (
    <div className="card stat-card">

      <div className="icon">{icon}</div>

      <div>
        <p className="label">{label}</p>
        <h2 style={{ color }}>{value}</h2>
      </div>

    </div>
  );
}