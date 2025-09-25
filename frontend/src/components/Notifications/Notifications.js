import './Notifications.css';

function Notifications() {
  return (
    <aside className="sidebar-right">
      <h4>Notificaciones</h4>
      <ul>
        <li className="notification unread">
          <div className="profile-wrapper">
            <img src="/default-avatar.png" alt="Usuario" className="profile-img" />
            <span className="status-dot"></span>
          </div>
          <span className="message">Usuario comentó un post</span>
        </li>

        <li className="notification unread">
          <div className="profile-wrapper">
            <img src="/default-avatar.png" alt="Usuario" className="profile-img" />
            <span className="status-dot"></span>
          </div>
          <span className="message">Usuario comentó un post</span>
        </li>

        <li className="notification">
          <div className="profile-wrapper">
            <img src="/default-avatar.png" alt="Usuario" className="profile-img" />
          </div>
          <span className="message">Post publicado</span>
        </li>
      </ul>
    </aside>
  );
}

export default Notifications;