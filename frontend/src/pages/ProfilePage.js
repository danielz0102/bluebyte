import axios from "axios";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/MainLayout/";
import Post from "../components/Post/Post";
import { usePosts } from "../hooks/usePosts";
import { useRef } from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const imageInputRef = useRef();
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || "");
  const [fullname, setFullname] = useState(user.fullname);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!enabled) {
      return setEnabled(true);
    }

    if (!validate()) return;

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("bio", bio);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const { data } = await axios.put(
        `http://localhost:3001/usuarios/${user.id}`,
        formData
      );

      localStorage.setItem("user", JSON.stringify(data.user));
      setEnabled(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);

      if (error.status === 409) {
        return setError("El nombre de usuario ya existe");
      }

      setError("Error al guardar los cambios. Por favor, inténtalo de nuevo.");
    }
  };

  const validate = () => {
    const usernameRe = /^[a-zA-Z0-9_.-]{3,20}$/;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || !email) {
      setError("Usuario y correo son obligatorios");
      return false;
    }

    if (!usernameRe.test(username)) {
      setError(
        "Usuario inválido: usa 3-20 caracteres alfanuméricos (._-), sin espacios."
      );
      return false;
    }

    if (email && !emailRe.test(email)) {
      setError("Correo electrónico inválido");
      return false;
    }

    setError(null);
    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
                  src={imagePreview || `data:image/jpg;base64,${user.image}`}
                  alt="Avatar"
                  className="avatar-lg"
                />
                {enabled && (
                  <button
                    className="btn btn-secondary"
                    onClick={() => imageInputRef.current.click()}
                  >
                    Cambiar foto
                  </button>
                )}
              </div>
              <form className="form-column" onSubmit={handleEdit}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="form-row">
                  <label>Nombre</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    disabled={!enabled}
                    defaultValue={user.fullname || ""}
                    onChange={(e) => setFullname(e.target.value.trim())}
                  />
                </div>
                <div className="form-row">
                  <label>Usuario</label>
                  <input
                    type="text"
                    placeholder="usuario123"
                    disabled={!enabled}
                    defaultValue={user.username}
                    onChange={(e) => setUsername(e.target.value.trim())}
                  />
                </div>
                <div className="form-row">
                  <label>Correo</label>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    disabled={!enabled}
                    defaultValue={user.email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                  />
                </div>
                <div className="form-row">
                  <label>Bio</label>
                  <textarea
                    placeholder="Cuéntanos sobre ti..."
                    rows="3"
                    disabled={!enabled}
                    defaultValue={user.bio}
                    onChange={(e) => setBio(e.target.value.trim())}
                  ></textarea>
                </div>
                <input
                  ref={imageInputRef}
                  id="image-input"
                  style={{ display: "none" }}
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e);
                    setImageFile(e.target.files[0]);
                  }}
                />
                <div className="form-actions">
                  <button className="btn btn-primary" type="submit">
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
