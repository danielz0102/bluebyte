import { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";
import axios from "axios";

export default function SearchBar() {
  const [posts, setPosts] = useState([]);

  const handleChange = async (e) => {
    const query = e.target.value;

    if (query.length === 0) {
      setPosts([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `http://localhost:3001/publicaciones?title=${query}`
      );
      setPosts(data);
    } catch (err) {
      console.error("Error al cargar publicaciones:", err);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar"
        className="search-bar-input"
        onChange={handleChange}
      />
      {posts.length > 0 && (
        <ul className="search-bar-results">
          {posts.map((post) => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
