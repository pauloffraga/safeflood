import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import '../styles/global.css';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';

import api from '../services/api';

export default function Dashboard() {

  const [waterLevel, setWaterLevel] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [regions, setRegions] = useState(0);

  // 🔥 BUSCAR DADOS DO BACKEND
  useEffect(() => {

    async function loadData() {
      try {

        const waterRes = await api.get("/water-level");
        const alertsRes = await api.get("/alerts");
        const regionsRes = await api.get("/regions");

        setWaterLevel(waterRes.data.level);
        setAlerts(alertsRes.data);
        setRegions(regionsRes.data.count);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    loadData();

    // 🔁 atualiza a cada 10s (tempo real fake)
    const interval = setInterval(loadData, 10000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="layout">

      <Sidebar />

      <main className="main">

        <Topbar />

        {/* KPIs */}
        <div className="cards">

          <StatCard 
            icon="🌊"
            label="Nível da Água"
            value={waterLevel ? `${waterLevel}m` : "Carregando..."}
            color="#0ea5e9"
          />

          <StatCard 
            icon="⚠️"
            label="Alertas Ativos"
            value={alerts.length}
            color="#ef4444"
          />

          <StatCard 
            icon="📍"
            label="Regiões Monitoradas"
            value={regions}
            color="#22c55e"
          />

        </div>

        {/* Conteúdo */}
        <div className="content">

          <div className="card">
            📊 Aqui depois entra seu gráfico de histórico
          </div>

          <div className="card">
            <h3>⚠️ Alertas recentes</h3>

            {alerts.length === 0 ? (
              <p>Nenhum alerta no momento</p>
            ) : (
              alerts.map((a, i) => (
                <p key={i}>• {a.message}</p>
              ))
            )}

          </div>

        </div>

      </main>
    </div>
  );
}