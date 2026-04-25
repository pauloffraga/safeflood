import React, { useState } from "react";
import api from "../services/api";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/auth/forgot-password", { email });

      setMessage("E-mail enviado com instruções de recuperação.");
    } catch (error) {
      setMessage("Erro ao enviar e-mail.");
    }
  }

  return (
    <div className="login-container">

      <h2>Recuperar senha</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          Enviar link
        </button>

      </form>

      {message && <p>{message}</p>}

    </div>
  );
}