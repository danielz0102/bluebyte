import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import Post from "../components/Post/Post";
import "./HomePage.css";

function HomePage() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/publicaciones");
      setPosts(data);
    } catch (err) {
      console.error("Error al cargar publicaciones:", err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <MainLayout>
      {posts.length === 0 && <p>No hay publicaciones disponibles.</p>}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </MainLayout>
  );
}

export default HomePage;
