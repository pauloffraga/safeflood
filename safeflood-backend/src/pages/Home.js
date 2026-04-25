import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Home.css';

function Home() {
  const [shelters, setShelters] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchShelters = async () => {
    try {
      const res = await api.get('/shelters');
      setShelters(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchShelters();
  }, []);

  const updateVagas = async (id, change) => {
    try {
      await api.patch(`/shelters/${id}/vagas`, { change });
      fetchShelters();
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao atualizar vagas');
    }
  };

  // Dashboard
  const totalAbrigos = shelters.length;

  const totalVagas = shelters.reduce(
    (acc, s) => acc + s.capacity_total,
    0
  );

  const vagasDisponiveis = shelters.reduce(
    (acc, s) => acc + s.capacity_available,
    0
  );

  return (
    <div className="container">

      {/* HEADER */}
      <div className="header">
        <h2>Abrigos</h2>

        <div className="top-actions">
          <button className="add" onClick={() => navigate('/create')}>
            + Novo Abrigo
          </button>

          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}
          >
            Sair
          </button>
        </div>
      </div>

      {/* DASHBOARD (FORA DO HEADER) */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <div className="card" style={{ flex: 1 }}>
          <h4>Abrigos</h4>
          <p>{totalAbrigos}</p>
        </div>

        <div className="card" style={{ flex: 1 }}>
          <h4>Capacidade</h4>
          <p>{totalVagas}</p>
        </div>

        <div className="card" style={{ flex: 1 }}>
          <h4>Disponíveis</h4>
          <p>{vagasDisponiveis}</p>
        </div>
      </div>

      {/* BUSCA */}
      <input
        type="text"
        placeholder="Buscar por cidade..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          marginTop: '15px',
          border: '1px solid #ccc'
        }}
      />

      {/* LISTA */}
      {shelters
        .filter(shelter =>
          shelter.city.toLowerCase().includes(search.toLowerCase())
        )
        .map(shelter => {
          const lotado = shelter.capacity_available === shelter.capacity_total;

          return (
            <div key={shelter.id} className="card">
              <h3>{shelter.name}</h3>
              <p className="city">{shelter.city}</p>

              <p className="vagas">
                Vagas: {shelter.capacity_available} / {shelter.capacity_total}
              </p>

              {/* BARRA DE OCUPAÇÃO */}
              <div
                style={{
                  height: '8px',
                  background: '#eee',
                  borderRadius: '10px',
                  marginTop: '10px'
                }}
              >
                <div
                  style={{
                    width: `${
                      shelter.capacity_total
                        ? (shelter.capacity_available / shelter.capacity_total) * 100
                        : 0
                    }%`,
                    background:
                      shelter.capacity_available === 0
                        ? 'red'
                        : shelter.capacity_available < shelter.capacity_total / 2
                        ? 'orange'
                        : 'green',
                    height: '100%',
                    borderRadius: '10px',
                    transition: '0.3s'
                  }}
                />
              </div>

              {lotado && <p className="lotado">LOTADO 🔴</p>}

              <div className="buttons">
                <button
                  className={`btn plus ${lotado ? 'disabled' : ''}`}
                  onClick={() => updateVagas(shelter.id, 1)}
                  disabled={lotado}
                >
                  ➕
                </button>

                <button
                  className={`btn minus ${
                    shelter.capacity_available === 0 ? 'disabled' : ''
                  }`}
                  onClick={() => updateVagas(shelter.id, -1)}
                  disabled={shelter.capacity_available === 0}
                >
                  ➖
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Home;