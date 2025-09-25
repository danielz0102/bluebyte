import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />         {/* 👈 Login como entrada */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />      {/* 👈 Home con publicaciones */}
      </Routes>
    </Router>
  );

}
export default App;