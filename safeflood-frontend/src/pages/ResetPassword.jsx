import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return setMessage("As senhas não coincidem");
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        setLoading(false);
        return;
      }

      setMessage("Senha redefinida com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch {
      setMessage("Erro ao conectar com o servidor");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <h1 style={styles.logo}>🌊 SafeFlood</h1>
        <h2 style={styles.title}>Nova Senha</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={styles.input}
          />

          <button style={styles.button} disabled={loading}>
            {loading ? "Salvando..." : "Redefinir Senha"}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    padding: "40px",
    borderRadius: "16px",
    width: "350px",
    color: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  logo: {
    marginBottom: "10px",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "8px",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    fontSize: "14px",
  },
};