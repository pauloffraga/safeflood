import React, { useEffect, useState, useCallback } from 'react';
import '../styles/Dashboard.css';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatCard from '../components/StatCard';
import WaterChart from "../components/WaterChart";

import api from '../services/api';

export default function Dashboard() {

  const [waterLevel, setWaterLevel] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [regions, setRegions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  // 🔥 Protegido contra undefined/null
  const getAlertLevel = (msg = "") => {
    const text = msg.toLowerCase();

    if (text.includes("crítico") || text.includes("critico")) return "danger";
    if (text.includes("atenção") || text.includes("atencao")) return "warning";
    return "normal";
  };

  // 🔥 useCallback evita recriação da função
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const [waterRes, alertsRes, regionsRes, historyRes] = await Promise.all([
        api.get("/water-level"),
        api.get("/alerts"),
        api.get("/regions"),
        api.get("/water-history"),
      ]);

      setWaterLevel(waterRes?.data?.level ?? 0);
      setAlerts(alertsRes?.data ?? []);
      setRegions(regionsRes?.data?.count ?? 0);
      setHistory(historyRes?.data ?? []);
      setError("");

    } catch (err) {
      console.error(err);
      setError("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const safeLoad = async () => {
      if (!isMounted) return;
      await loadData();
    };

    safeLoad();

    const interval = setInterval(safeLoad, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };

  }, [loadData]);

  return (
    <div className="layout">

      <Sidebar />

      <main className="main">

        <Topbar />

        {/* ERRO */}
        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {/* CARDS */}
        <div className="cards">

          <StatCard 
            label="Nível da Água"
            value={loading ? "..." : `${waterLevel}m`}
            color="#0ea5e9"
          />

          <StatCard 
            label="Alertas Ativos"
            value={loading ? "..." : alerts.length}
            color="#ef4444"
          />

          <StatCard 
            label="Regiões Monitoradas"
            value={loading ? "..." : regions}
            color="#22c55e"
          />

        </div>

        {/* CONTEÚDO */}
        <div className="content">

          {/* GRÁFICO */}
          <div className="card">
            <h3>📊 Nível da água</h3>

            {loading ? (
              <p>Carregando gráfico...</p>
            ) : history.length === 0 ? (
              <p>Sem dados disponíveis</p>
            ) : (
              <WaterChart data={history} />
            )}

          </div>

          {/* ALERTAS */}
          <div className="card">

            <h3>🚨 Alertas recentes</h3>

            {loading ? (
              <p>Carregando...</p>
            ) : alerts.length === 0 ? (
              <p className="safe">Nenhum alerta no momento</p>
            ) : (
              alerts.map((a, i) => (
                <div 
                  key={i} 
                  className={`alert-item ${getAlertLevel(a.message)}`}
                >
                  ⚠️ {a.message || "Alerta sem descrição"}
                </div>
              ))
            )}

          </div>

        </div>

      </main>
    </div>
  );
}