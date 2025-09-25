
import './CategoriesPage.css';
import Navbar from '../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState(['General', 'Anuncios', 'Tutoriales', 'Soporte']);
  const [name, setName] = useState('');

  const addCategory = (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    if (categories.includes(n)) return alert('La categoría ya existe');
    setCategories([...categories, n]);
    setName('');
  };

  const removeCategory = (c) => {
    setCategories(categories.filter(x => x !== c));
  };

  return (
    <div className="page categories-page">
      <Navbar />
      <div className="page-body">
        <div className="page-header">
          <h1>Crear categorías</h1>
          <div className="breadcrumbs">
            <Link to="/home">Inicio</Link> <span>/</span> <span>Categorías</span>
          </div>
        </div>

        <section className="grid">
          <form className="card" onSubmit={addCategory}>
            <h2>Nueva categoría</h2>
            <div className="form-row">
              <label>Nombre</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Ej. Noticias" />
            </div>
            <button className="btn btn-primary" type="submit">Agregar</button>
          </form>

          <div className="card">
            <h2>Listado</h2>
            <ul className="cat-list">
              {categories.map(c => (
                <li key={c}>
                  <span>{c}</span>
                  <button className="btn btn-danger" onClick={()=>removeCategory(c)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
