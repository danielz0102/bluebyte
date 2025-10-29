import "./ProfilePage.css";
import MainLayout from "../components/MainLayout/";
import { usePosts } from "../hooks/usePosts";
import { useParams } from "react-router-dom";
import Post from "../components/Post/Post";

export default function ProfilePage() {
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
                  src="/default-avatar.png"
                  alt="Avatar"
                  className="avatar-lg"
                />
                <button className="btn btn-secondary">Cambiar foto</button>
              </div>
              <form
                className="form-column"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-row">
                  <label>Nombre</label>
                  <input type="text" placeholder="Tu nombre" />
                </div>
                <div className="form-row">
                  <label>Usuario</label>
                  <input type="text" placeholder="usuario123" />
                </div>
                <div className="form-row">
                  <label>Correo</label>
                  <input type="email" placeholder="correo@ejemplo.com" />
                </div>
                <div className="form-row">
                  <label>Bio</label>
                  <textarea
                    placeholder="Cuéntanos sobre ti..."
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button className="btn btn-primary" type="submit">
                    Guardar cambios
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
  const posts = usePosts({ userId: id });

  return (
    <section style={{ marginTop: "32px" }}>
      <h2>Mis Publicaciones</h2>
      <main>
        {posts.length === 0 && <p>No has creado ninguna publicación aún.</p>}
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </section>
  );
}
