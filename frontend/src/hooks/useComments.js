import axios from "axios";
import { useEffect, useState } from "react";

export function useComments(postId) {
  const [comments, setComments] = useState([]);

  const fetchComments = async (postId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/comments?postId=${postId}`
      );
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
        await axios.post("http://localhost:3001/comments", nuevo);
        fetchComments();
      } catch (err) {
        console.error("Error al enviar comentario:", err);
      }
    }
  };

  useEffect(() => {
    fetchComments(postId);
  }, [postId]);

  return { comments, postComment };
}
