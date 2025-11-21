import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Categories from "./pages/Categories/Categories";
import ProfilePage from "./pages/ProfilePage";
import PostDetailPage from "./pages/PostDetailPage";
import CreatePostPage from "./pages/CreatePostPage";
import CategoriesPage from "./pages/CategoriesPage";
import OptionsPage from "./pages/OptionsPage";
import EditPostPage from "./pages/EditPostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/perfil/:id" element={<ProfilePage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/nuevo-post" element={<CreatePostPage />} />
        <Route path="/edit_post/:id" element={<EditPostPage />} />
        <Route path="/categorias/crear" element={<CategoriesPage />} />
        <Route path="/opciones" element={<OptionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
