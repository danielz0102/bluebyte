import axios from "axios";
import { useEffect, useState } from "react";

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotifications = async () => {
    if (!userId) {
      console.warn("userId no definido, no se puede cargar notificaciones");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`http://localhost:3001/notifications/${userId}`);
      setNotifications(data);
    } catch (err) {
      console.error("Error al cargar notificaciones:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [userId]);

  return { notifications, loading, setNotifications };
}