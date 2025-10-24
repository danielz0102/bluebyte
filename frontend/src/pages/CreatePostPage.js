import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import PostForm from "../components/PostForm/PostForm";
import "./CreatePostPage.css";
import axios from "axios";

export default function CreatePostPage() {
  const navigate = useNavigate();

  const handleCreate = async (postData) => {
    try {
      await axios.post("http://localhost:3001/posts", postData);
      alert("Publicación creada con éxito!");
      navigate("/home");
    } catch (err) {
      console.error("Error al publicar:", err);
      alert("Error al crear la publicación. Intenta de nuevo.");
    }
  };

  return (
    <MainLayout>
      <div className="page create-post-page">
        <div className="page-body">
          <div className="page-header">
            <h1>Publicar</h1>
          </div>
          <PostForm onSubmit={handleCreate} />
        </div>
      </div>
    </MainLayout>
  );
}