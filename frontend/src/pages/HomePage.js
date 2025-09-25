import './HomePage.css';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Notifications from '../components/Notifications/Notifications';
import Post from '../components/Post/Post';

function HomePage() {
  return (
    <div
      className="homepage"
      style={{
        backgroundColor: "#cce6ff",
        backgroundImage: "url('/circuit.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <main className="content-area">
          <Post />
          <Post />
          <Post />
        </main>

        <Notifications />
      </div>
    </div>
  );
}

export default HomePage;