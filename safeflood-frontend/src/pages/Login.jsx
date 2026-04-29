import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Erro ao fazer login");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch {
      setMessage("Erro ao conectar com o servidor");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>

      {/* LADO ESQUERDO (branding) */}
      <div style={styles.left}>
        <h1 style={styles.logo}>🌊 SafeFlood</h1>
        <p style={styles.subtitle}>
          Monitoramento inteligente de enchentes em tempo real
        </p>
      </div>

      {/* LADO DIREITO (login) */}
      <div style={styles.card}>
        <h2 style={styles.title}>Entrar</h2>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <input
            type="email"
            placeholder="seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <div style={styles.passwordBox}>
            <input
              type={show ? "text" : "password"}
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />

            <span
              style={styles.eye}
              onClick={() => setShow(!show)}
            >
              {show ? "🙈" : "👁️"}
            </span>
          </div>

          <button style={styles.button} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div style={styles.links}>
          <span onClick={() => navigate("/forgot-password")}>
            Ajuda com minha senha
          </span>
        </div>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
  },

  left: {
    flex: 1,
    background: "linear-gradient(135deg, #0ea5e9, #1e3a8a)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },

  logo: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "16px",
    opacity: 0.8,
  },

  card: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px",
    background: "#0f172a",
    color: "#fff",
  },

  title: {
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#020617",
    color: "#fff",
    outline: "none",
  },

  passwordBox: {
    position: "relative",
  },

  eye: {
    position: "absolute",
    right: "12px",
    top: "12px",
    cursor: "pointer",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#0ea5e9",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s",
  },

  links: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#38bdf8",
    cursor: "pointer",
  },

  message: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#f87171",
  },
};