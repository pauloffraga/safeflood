import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function CreateShelter() {
  const [form, setForm] = useState({
    name: '',
    city: '',
    capacity_total: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/shelters', {
        ...form,
        capacity_available: form.capacity_total
      });

      alert('Abrigo criado!');
      navigate('/');
    } catch (err) {
      alert('Erro ao criar abrigo');
    }
  };

  return (
    <div className="container">
      <h2>Novo Abrigo</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Cidade"
          onChange={e => setForm({ ...form, city: e.target.value })}
        />

        <input
          placeholder="Capacidade"
          type="number"
          onChange={e => setForm({ ...form, capacity_total: Number(e.target.value) })}
        />

        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default CreateShelter;