import axios from "axios";
import { useEffect, useState } from "react";


export function usePosts({ userId, title } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (userId) queryParams.append("userId", userId);
    if (title) queryParams.append("title", title);


export function usePosts({ userId } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();

  }, [userId, title]); // se recarga si cambian los filtros

  return { posts, loading, reload: getPosts };
}

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { posts, loading };
}

