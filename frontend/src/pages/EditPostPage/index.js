import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import "../CreatePostPage.css";
import { httpClient } from "../../httpClient";
import { useEffect, useState } from "react";
import EditPostForm from "./EditPostForm";

export default function EditPostPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [postData, setPostData] = useState(null);

  const handleEdit = async (postData) => {
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("userId", postData.userId);
    formData.append("image", postData.image);

    try {
      await httpClient.put(`/publicaciones/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/post/${id}`);
    } catch (err) {
      console.error("Error al editar la publicación:", err);
      alert("Error al editar la publicación. Intenta de nuevo.");
    }
  };

  const getPostData = async (postId) => {
    try {
      const response = await httpClient.get(`/publicaciones/${postId}`);
      setPostData(response.data);
    } catch (err) {
      console.error("Error al obtener los datos de la publicación:", err);
    }
  }

  useEffect(() => {
    if (id) {
      getPostData(id);
    }
  }, [id])

  return (
    <MainLayout>
      <div className="page create-post-page">
        <div className="page-body">
          <div className="page-header">
            <h1>Editar publicacion</h1>
          </div>
          {postData ? <EditPostForm initialData={postData} onSubmit={handleEdit} /> : <p>Cargando datos de la publicación...</p>}
        </div>
      </div>
    </MainLayout>
  );
}
