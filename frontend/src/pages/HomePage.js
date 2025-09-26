import MainLayout from "../components/MainLayout/";
import Post from "../components/Post/Post";
import "./HomePage.css";

function HomePage() {
  return (
    <MainLayout>
      <Post />
      <Post />
      <Post />
    </MainLayout>
  );
}

export default HomePage;
