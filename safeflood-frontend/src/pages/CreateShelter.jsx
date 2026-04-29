import React, { useState } from "react";
import api from "../services/api";

export default function CreateShelter() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    capacity: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/shelters", form);

      setSuccess(true);
      setForm({
        name: "",
        address: "",
        capacity: "",
        city: "",
      });

      setMessage("Abrigo cadastrado com sucesso!");

    } catch (err) {
      setSuccess(false);
      setMessage("Erro ao cadastrar abrigo");
    }

    setLoading(false);
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1>🏠 Novo Abrigo</h1>
        <p style={styles.subtitle}>
          Cadastre um novo ponto seguro
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>

          <input
            name="name"
            placeholder="Nome do Abrigo"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="city"
            placeholder="Cidade"
            value={form.city}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="address"
            placeholder="Endereço"
            value={form.address}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="capacity"
            type="number"
            placeholder="Capacidade"
            value={form.capacity}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button style={styles.button} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>

        </form>

        {message && (
          <div style={{
            ...styles.alert,
            background: success ? "#dcfce7" : "#fee2e2",
            color: success ? "#166534" : "#991b1b"
          }}>
            {message}
          </div>
        )}

      </div>
    </div>
  );
}

/* 👇 APENAS UM styles */
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },

  card: {
    width: "400px",
    background: "#1e293b",
    padding: "30px",
    borderRadius: "12px",
    color: "#fff",
  },

  subtitle: {
    fontSize: "14px",
    marginBottom: "15px",
    color: "#94a3b8",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },

  button: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#38bdf8",
    cursor: "pointer",
    fontWeight: "bold",
  },

  alert: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "8px",
  }
};