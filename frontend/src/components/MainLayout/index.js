import Navbar from "../Navbar/Navbar";
import Notifications from "../Notifications/Notifications";
import Sidebar from "../Sidebar/Sidebar";
import "./MainLayout.css";

export default function MainLayout({ children }) {
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
        <main className="content-area">{children}</main>
        <Notifications />
      </div>
    </div>
  );
}
