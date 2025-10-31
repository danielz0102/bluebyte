const express = require("express");
const cors = require("cors");
const msyql2 = require("mysql2");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

const db = msyql2.createConnection({
  host: "localhost",
  user: "root",
  password: "my_sqlz",
  database: "bluebyte",
  port: 3306,
});

const file = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_, file, cb) => {
    const formatos = ["image/png", "image/jpg", "image/jpeg"];

    if (formatos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Archivo no aceptado"));
    }
  },
});

app.post("/registrar", file.single("image"), (req, res) => {
  const { username, password, email } = req.body;
  const imagen = req.file.buffer.toString("base64");

  db.query(
    "CALL registerUser(?,?,?,?)",
    [username, password, email, imagen],
    (err, result) => {
      if (err) {
        console.log(err);
        if (err.sqlState === "45000") {
          return res.status(409).json({ message: "Username already exists" });
        }

        return res.status(500).json({ message: "ErrBD" });
      }

      const userData = result[0][0];

      res.status(201).json({
        message: "Usuario registrado",
        user: userData,
      });
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query("CALL login(?,?)", [username, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "ErrBD" });
    }

    if (result[0].length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const userData = result[0][0];

    return res.json({
      message: "Login exitoso",
      user: userData,
    });
  });
});

app.get("/publicaciones", (req, res) => {
  const { userId } = req.query;

  const resultHandler = (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "ErrBD" });
    }

    return res.json(result[0]);
  };

  if (!userId) {
    db.query("CALL getLastestPosts()", resultHandler);
  } else {
    db.query("CALL getPostsByUser(?)", [userId], resultHandler);
  }
});

app.get("/publicaciones/:id", (req, res) => {
  const postId = req.params.id;

  db.query(
    `SELECT posts.*, users.username 
     FROM posts 
     INNER JOIN users ON posts.userId = users.id 
     WHERE posts.id = ?`,
    [postId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "ErrBD" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Publicación no encontrada" });
      }

      return res.json(result[0]);
    }
  );
});

app.post("/publicaciones", file.single("image"), (req, res) => {
  const { title, content, userId, categoryId } = req.body;

  const image = req.file.buffer.toString("base64");

  db.query(
    "CALL createPost(?,?,?,?,?)",
    [title, content, image, userId, categoryId],
    (err, result) => {
      if (err) {
        console.log(err);

        if (err.sqlState === "45000") {
          return res.status(409).json({ message: "El usuario no existe" });
        }

        return res.status(500).json({ message: "ErrBD" });
      }

      const postData = result[0][0];
      res.status(201).json({ message: "Publicación creada", post: postData });
    }
  );
});

app.put("/publicaciones/:id", file.single("image"), (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const image = req.file.buffer.toString("base64");

  db.query(
    "CALL updatePost(?,?,?,?,?)",
    [postId, title, content, image],
    (err, result) => {
      if (err) {
        console.log(err);

        if (err.sqlState === "45000") {
          return res.status(404).json({ message: "La publicación no existe" });
        }

        return res.status(500).json({ message: "ErrBD" });
      }

      const postData = result[0][0];
      res.json({ message: "Publicación actualizada", post: postData });
    }
  );
});

app.delete("/publicaciones/:id", (req, res) => {
  const postId = req.params.id;

  db.query("CALL deletePost(?)", [postId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "ErrBD" });
    }

    res.json({ message: "Publicación eliminada" });
  });
});

app.get("/categorias", (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) return res.status(500).json({ message: "Error en DB" });
    res.json(result);
  });
});

app.post("/registrarCategorias", file.single("image"), (req, res) => {
  const { title, description, userId } = req.body;
  const image = req.file.buffer.toString("base64");

  db.query(
    "CALL registerCategory(?,?,?,?)",
    [title, description, image, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        if (err.sqlState === "45000")
          return res.status(409).json({ message: "La categoría ya existe" });
        return res.status(500).json({ message: "Error en DB" });
      }
      res
        .status(201)
        .json({ message: "Categoría registrada", category: result[0][0] });
    }
  );
});
app.get("/categorias/:userId", (req, res) => {
  const { userId } = req.params;

  db.query(
    "SELECT * FROM categories WHERE userId = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error al cargar categorías:", err);
        return res.status(500).json({ error: "Error al cargar categorías" });
      }
      res.json(results);
    }
  );
});

app.put("/editar_categoria/:id", (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  db.query(
    "UPDATE categories SET description = ? WHERE id = ?",
    [description, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.sqlMessage });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Categoría no encontrada" });
      }
      res.status(200).json({
        success: true,
        message: "Descripción actualizada correctamente",
      });
    }
  );
});

app.delete("/eliminar_categoria/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM categories WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error al eliminar" });
    res.json({ message: "Categoría eliminada" });
  });
});

app.get("/comments", (req, res) => {
  const { postId } = req.query;

  if (!postId) {
    return res.status(400).json({ message: "postId faltante" });
  }

  db.query("CALL getComments(?)", [postId], (err, results) => {
    if (err) {
      console.error("Error al cargar comentarios:", err);
      return res.status(500).json({ message: "Error en la base de datos" });
    }

    res.json(results[0]);
  });
});

app.post("/comments", (req, res) => {
  const { content, postId, userId } = req.body;

  db.query(
    "INSERT INTO comments (content, postId, userId) VALUES (?,?,?)",
    [content, postId, userId],
    (err, result) => {
      if (err) {
        console.error("Error al insertar comentario:", err);
        return res.status(500).json({ message: "Error en la base de datos" });
      }

      res
        .status(201)
        .json({ message: "Comentario agregado", commentId: result.insertId });
    }
  );
});

app.put("/usuarios/:id", file.single("image"), (req, res) => {
  const userId = req.params.id;
  const { fullname, username, email, bio } = req.body;
  const image = req.file ? req.file.buffer.toString("base64") : null;

  db.query(
    "CALL updateUser(?,?,?,?,?,?)",
    [userId, fullname, username, email, bio, image],
    (err, result) => {
      if (err) {
        console.log(err);
        if (err.sqlState === "45000") {
          return res.status(409).json({ message: "Username already exists" });
        }
        return res.status(500).json({ message: "Error en DB" });
      }

      res
        .status(200)
        .json({ message: "Usuario actualizado", user: result[0][0] });
    }
  );
});
