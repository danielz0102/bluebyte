import MainLayout from "../components/MainLayout";
import Post from "../components/Post/Post";
import { usePosts } from "../hooks/usePosts";
import "./HomePage.css";

function HomePage() {
  const posts = usePosts();

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
