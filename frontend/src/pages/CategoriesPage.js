import "./CategoriesPage.css";
import MainLayout from "../components/MainLayout";
import { useState, useEffect } from "react";
import { httpClient } from "../httpClient";
import Alert from "../components/Alert/Alert";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editId, setEditingId] = useState(null);
  const [editedDesc, setEditedDesc] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCategories = async () => {
    try {
      const { data } = await httpClient.get(`/categorias/${user.id}`);
      setCategories(data);
      setError("");
    } catch (err) {
      console.error("Error al cargar categorías:", err);
      setError("No se pudieron cargar las categorías");
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", desc);
    formData.append("image", imageFile);
    formData.append("userId", user.id);

    try {
      await httpClient.post("/registrarCategorias", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Categoría registrada correctamente");
      setError("");
      setName("");
      setDesc("");
      setImageFile(null);
      setPreviewImage(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        setError("La categoría ya existe");
      } else {
        setError("Error al registrar la categoría. Intenta más tarde.");
      }
    }
  };

  const validate = () => {
    if (!name.trim() || !desc.trim()) {
      setError("El nombre y la descripción son obligatorios");
      return false;
    }
    if (!imageFile) {
      setError("Debes subir una imagen para la categoría");
      return false;
    }
    setError("");
    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const removeCategory = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta categoría?")) return;
    try {
      await httpClient.delete(`/eliminar_categoria/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error al eliminar:", err);
      setError("No se pudo eliminar la categoría");
    }
  };

  const startEditing = (category) => {
    setEditingId(category.id);
    setEditedDesc(category.description);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedDesc("");
  };

  const saveEdit = async (id) => {
    if (!editedDesc.trim()) {
      setError("La descripción no puede estar vacía");
      return;
    }

    try {
      const response = await httpClient.put(
        `/editar_categoria/${id}`,
        {
          description: editedDesc,
        }
      );

      if (response.data.success) {
        setSuccess("Descripción actualizada correctamente");
        setError("");
        setEditingId(null);
        setEditedDesc("");
        fetchCategories();
      } else {
        setError(response.data.message || "No se pudo editar");
      }
    } catch (err) {
      setError("No se pudo editar la descripción");
    }
  };

  return (
    <MainLayout>
      <div className="page categories-page">
        <div className="page-body">
          <div className="page-header">
            <h1>Crear categorías</h1>
          </div>

          <section className="grid">
            <form className="card" onSubmit={addCategory}>
              <h2>Nueva categoría</h2>

              {error && <Alert message={error} type="error" />}
              {success && <Alert message={success} type="success" />}

              <div className="form-row">
                <label>Nombre</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Noticias"
                />

                <label>Descripción</label>
                <input
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Ej. Mostrar lo nuevo sobre..."
                />

                <label>Imagen</label>
                <label htmlFor="file-upload" className="photo-placeholder">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="preview-img"
                    />
                  ) : (
                    <span className="plus-sign">+</span>
                  )}
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>

              <button className="btn btn-primary" type="submit">
                Agregar
              </button>
            </form>
            <div className="card">
              <h2>Listado</h2>
              <ul className="cat-list">
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <li key={c.id}>
                      <span>
                        <strong>{c.title}</strong> —{" "}
                        {editId === c.id ? (
                          <>
                            <input
                              type="text"
                              value={editedDesc}
                              onChange={(e) => setEditedDesc(e.target.value)}
                            />
                            <button
                              className="btn btn-success"
                              onClick={() => saveEdit(c.id)}
                            >
                              Guardar
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={cancelEditing}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            {c.description}
                            <div className="cat-actions">
                              <button
                                className="btn btn-edit"
                                onClick={() => startEditing(c)}
                              >
                                Editar
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => removeCategory(c.id)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </>
                        )}
                      </span>
                    </li>
                  ))
                ) : (
                  <p>No hay categorías registradas</p>
                )}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}