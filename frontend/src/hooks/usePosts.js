import axios from "axios";
import { useEffect, useState } from "react";

export function usePosts({ userId } = {}) {
  const [posts, setPosts] = useState([]);
  const queryParams = new URLSearchParams();

  if (userId) {
    queryParams.append("userId", userId);
  }

  const getPosts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/publicaciones?${queryParams.toString()}`
      );
      setPosts(data);
    } catch (err) {
      console.error("Error al cargar publicaciones:", err);
    }
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return posts;
}
