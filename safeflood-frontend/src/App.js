import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateShelter from './pages/CreateShelter';
import PrivateRoute from './routes/PrivateRoute';
import Login from './pages/Login';
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateShelter /></PrivateRoute>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;