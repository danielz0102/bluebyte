import { httpClient } from "../httpClient";
import { useEffect, useState } from "react";

export function useComments(postId) {
  const [comments, setComments] = useState([]);

  // Cargar comentarios de un post
  const fetchComments = async () => {
    if (!postId) {
      console.warn("postId no definido, no se puede cargar comentarios");
      return;
    }
    try {
      const { data } = await httpClient.get(`/comments?postId=${postId}`);
      setComments(data);
    } catch (err) {
      console.error("Error al cargar comentarios:", err);
    }
  };

  const postComment = async (content) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (content.trim() && user) {
      const nuevo = {
        content,
        postId: postId,
        userId: user.id,
      };

      try {
        await httpClient.post("/comments", nuevo);

      } catch (err) {
        console.error("Error al enviar comentario:", err);
      }
    }

    fetchComments();
  };

  // Efecto inicial: cargar comentarios cuando cambia el postId
  useEffect(() => {
    fetchComments();
  }, [postId]);

  return { comments, postComment };
}
