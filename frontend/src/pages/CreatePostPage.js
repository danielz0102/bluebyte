import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import PostForm from "../components/PostForm/PostForm";
import "./CreatePostPage.css";
import { httpClient } from "../httpClient";

export default function CreatePostPage() {
  const navigate = useNavigate();

  const handleCreate = async (postData) => {
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("userId", postData.userId);
    formData.append("categoryId", postData.category);
    formData.append("image", postData.image);

    try {
      await httpClient.post("/publicaciones", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
