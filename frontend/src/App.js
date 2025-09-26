import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Categories from "./pages/Categories/Categories";
import ProfilePage from "./pages/ProfilePage";
import PostDetailPage from "./pages/PostDetailPage";
import CreatePostPage from "./pages/CreatePostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/post" element={<PostDetailPage />} />
        <Route path="/nuevo-post" element={<CreatePostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
