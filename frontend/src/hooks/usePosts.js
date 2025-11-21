import { useEffect, useState } from "react";
import { httpClient } from "../httpClient";

export function usePosts({ userId, title } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (userId) queryParams.append("userId", userId);
    if (title) queryParams.append("title", title);

    try {
      const { data } = await httpClient.get(
        `/publicaciones?${queryParams.toString()}`
      );
      setPosts(data);
    } catch (err) {
      console.error("Error al cargar publicaciones:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, [userId, title]); // se recarga si cambian los filtros

  return { posts, loading, reload: getPosts };
}
