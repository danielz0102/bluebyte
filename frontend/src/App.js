import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Categories from './pages/Categories/Categories'; // 👈 nueva importación

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/categorias" element={<Categories />} /> {/* 👈 nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;