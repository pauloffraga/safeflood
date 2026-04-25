import { useState } from 'react';
import api from '../services/api';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);

    } catch (error) {
      alert('Erro no login');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <button type="submit" className="btn-login">
        Entrar
      </button>

      <p className="forgot-password">
        <a href="/forgot-password">Esqueci minha senha</a>
      </p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;