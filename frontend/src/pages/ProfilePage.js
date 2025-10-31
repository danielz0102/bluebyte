import "./ProfilePage.css";
import MainLayout from "../components/MainLayout/";
import { usePosts } from "../hooks/usePosts";
import { useParams } from "react-router-dom";
import Post from "../components/Post/Post";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function ProfilePage() {
  const [enabled, setEnabled] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleEdit = () => {
    setEnabled(false);
  };

  return (
    <MainLayout>
      <div className="page profile-page">
        <div className="page-body">
          <div className="page-header">
            <h1>Mi Perfil</h1>
          </div>
          <section className="card">
            <div className="profile-grid">
              <div className="avatar-column">
                <img
                  src={`data:image/jpg;base64,${user.image}`}
                  alt="Avatar"
                  className="avatar-lg"
                />
                {enabled && (
                  <button className="btn btn-secondary">Cambiar foto</button>
                )}
              </div>
              <form
                className="form-column"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-row">
                  <label>Nombre</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    disabled={!enabled}
                    defaultValue={user.fullname}
                  />
                </div>
                <div className="form-row">
                  <label>Usuario</label>
                  <input
                    type="text"
                    placeholder="usuario123"
                    disabled={!enabled}
                    defaultValue={user.username}
                  />
                </div>
                <div className="form-row">
                  <label>Correo</label>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    disabled={!enabled}
                    defaultValue={user.email}
                  />
                </div>
                <div className="form-row">
                  <label>Bio</label>
                  <textarea
                    placeholder="Cuéntanos sobre ti..."
                    rows="3"
                    disabled={!enabled}
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={() => {
                      if (enabled) {
                        return handleEdit();
                      }

                      setEnabled(true);
                    }}
                  >
                    {enabled ? "Guardar cambios" : "Editar perfil"}
                  </button>
                </div>
              </form>
            </div>
          </section>
          <UserPosts />
        </div>
      </div>
    </MainLayout>
  );
}

function UserPosts() {
  const { id } = useParams();
  const [showPosts, setShowPosts] = useState(false);
  const { posts } = usePosts({ userId: id });

  return (
    <section className="ProfilePage-user-posts">
      <h2 onClick={() => setShowPosts((prev) => !prev)}>
        Mis Publicaciones {showPosts ? <ChevronDown /> : <ChevronRight />}
      </h2>
      {showPosts && (
        <main>
          {posts.length === 0 && <p>No has creado ninguna publicación aún.</p>}
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </main>
      )}
    </section>
  );
}
