import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import WaterChart from "../components/WaterChart";
import CreateShelterModal from "../components/CreateShelterModal";

import api from "../services/api";

export default function Dashboard() {

  const [data, setData] = useState({
    waterLevel: 0,
    alerts: [],
    regions: 0,
    history: []
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 FUNÇÃO CENTRAL (AGORA CORRETA)
  const loadData = async () => {
    try {
      setLoading(true);

      const [water, alerts, regions, history] = await Promise.all([
        api.get("/water-level"),
        api.get("/alerts"),
        api.get("/regions"),
        api.get("/water-history")
      ]);

      setData({
        waterLevel: water.data.level,
        alerts: alerts.data,
        regions: regions.data.count,
        history: history.data
      });

      setError("");

    } catch (err) {
      setError("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 CARREGAMENTO INICIAL + AUTO UPDATE
  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="layout">

      <Sidebar />

      <main className="main">

        <Topbar />

        {error && <div className="error-box">{error}</div>}

        {/* BOTÃO */}
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: "10px 15px",
              background: "#38bdf8",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            + Novo Abrigo
          </button>
        </div>

        {/* CARDS */}
        <div className="cards">

          <StatCard
            label="Nível da Água"
            value={loading ? "..." : `${data.waterLevel}m`}
            color="#0ea5e9"
          />

          <StatCard
            label="Alertas"
            value={loading ? "..." : data.alerts.length}
            color="#ef4444"
          />

          <StatCard
            label="Regiões"
            value={loading ? "..." : data.regions}
            color="#22c55e"
          />

        </div>

        {/* CONTEÚDO */}
        <div className="content">

          {/* GRÁFICO */}
          <div className="card">
            <h3>📊 Histórico do nível da água</h3>

            {loading ? (
              <p>Carregando gráfico...</p>
            ) : (
              <WaterChart data={data.history} />
            )}
          </div>

          {/* ALERTAS */}
          <div className="card">
            <h3>🚨 Alertas recentes</h3>

            {loading ? (
              <p>Carregando...</p>
            ) : data.alerts.length === 0 ? (
              <p style={{ color: "#64748b" }}>Nenhum alerta ativo</p>
            ) : (
              data.alerts.map((a, i) => (
                <div key={i} className="alert-item">
                  {a.message}
                </div>
              ))
            )}

          </div>

        </div>

        {/* 🔥 MODAL (AGORA CORRETO) */}
        {showModal && (
          <CreateShelterModal
            onClose={() => setShowModal(false)}
            onSuccess={loadData} // 🔥 atualiza dashboard automático
          />
        )}

      </main>
    </div>
  );
}