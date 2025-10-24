import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import Post from "../components/Post/Post";
import "./HomePage.css";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simulación de publicaciones
    const mockPosts = [
      {
        id: 1,
        title: "Cómo usar React con estilo",
        category: "Tutoriales",
        content: "En este post te explico cómo combinar React con CSS moderno para lograr interfaces atractivas.",
        image: "/images/science.png",
        publishedAt: "2025-10-23T15:30:00",
        username: "sofia",
      },
      {
        id: 2,
        title: "¡Nuevo diseño en Bluebyte!",
        category: "Anuncios",
        content: "Hemos actualizado el diseño de la plataforma para mejorar la experiencia de usuario. ¡Cuéntanos qué opinas!",
        image: "/images/post.png",
        publishedAt: "2025-10-22T10:15:00",
        username: "luis",
      },
    ];

    setPosts(mockPosts);
  }, []);


  return (
    <MainLayout>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </MainLayout>
  );
}

export default HomePage;