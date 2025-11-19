import './Notifications.css';
import { useNotifications } from "../../hooks/useNotifications";
import axios from "axios";


function Notifications() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { notifications, loading, setNotifications } = useNotifications(user?.id);

  const markAsRead = async (id) => {
    await axios.put(`http://localhost:3001/notifications/${id}/seen`);
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, seen: true } : n)
    );
  };

  if (loading) return <aside className="sidebar-right">Cargando notificaciones...</aside>;

  return (
    <aside className="sidebar-right">
      <h4>Notificaciones</h4>
      <ul>
        {notifications.map(n => (
          <li
            key={n.id}
            className={`notification ${n.seen ? "" : "unread"}`}
            onClick={() => markAsRead(n.id)}
          >
            <div className="profile-wrapper">
              <img src="/default-avatar.png" alt="Usuario" className="profile-img" />
              {!n.seen && <span className="status-dot"></span>}
            </div>
            <span className="message">{n.message}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Notifications;