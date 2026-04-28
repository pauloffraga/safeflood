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

      // 🔐 salvar token
      localStorage.setItem("token", data.token);

      // opcional: salvar usuário
      localStorage.setItem("user", JSON.stringify(data.user));

      // redirecionar
      navigate("/dashboard");

    } catch {
      setMessage("Erro ao conectar com o servidor");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.logo}>🌊 SafeFlood</h1>
        <h2 style={styles.title}>Entrar</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Seu email"
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
              style={{ ...styles.input, marginBottom: 0 }}
              required
            />

            <span
              style={styles.eye}
              onClick={() => setShow(!show)}
            >
              {show ? "" : ""}
            </span>
          </div>

          <button style={styles.button} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div style={styles.links}>
          <span onClick={() => navigate("/forgot-password")}>
            Esqueci minha senha
          </span>
        </div>

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
  passwordBox: {
    position: "relative",
    marginBottom: "15px",
  },
  eye: {
    position: "absolute",
    right: "10px",
    top: "10px",
    cursor: "pointer",
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
  links: {
    marginTop: "15px",
    fontSize: "14px",
    cursor: "pointer",
    color: "#38bdf8",
  },
  message: {
    marginTop: "15px",
    fontSize: "14px",
  },
};