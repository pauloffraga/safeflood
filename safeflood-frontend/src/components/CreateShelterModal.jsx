import React, { useState } from "react";
import api from "../services/api";

export default function CreateShelterModal({ onClose, onSuccess }) {

  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    capacity: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/shelters", form);
      onSuccess(); // 🔥 atualiza dashboard
      onClose();   // fecha modal
    } catch {
      alert("Erro ao criar abrigo");
    }

    setLoading(false);
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        <h2>Novo Abrigo</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="name" placeholder="Nome" onChange={handleChange} required />
          <input name="city" placeholder="Cidade" onChange={handleChange} required />
          <input name="address" placeholder="Endereço" onChange={handleChange} required />
          <input name="capacity" type="number" placeholder="Capacidade" onChange={handleChange} required />

          <button disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>

        <button onClick={onClose} style={styles.close}>
          Cancelar
        </button>

      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  modal: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "12px",
    width: "400px",
    color: "#fff",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "15px",
  },

  close: {
    marginTop: "10px",
    background: "transparent",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  }
};