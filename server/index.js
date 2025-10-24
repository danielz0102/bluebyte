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
  const { username, password } = req.body;
  const imagen = req.file.buffer.toString("base64");

  db.query(
    "CALL registerUser(?,?,?)",
    [username, password, imagen],
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
        user: {
          id: userData.id,
          username: userData.username,
        },
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
      user: {
        id: userData.id,
        username: userData.username,
      },
    });
  });
});

app.get("/publicaciones", (req, res) => {
  db.query("CALL getLastestPosts()", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "ErrBD" });
    }

    return res.json(result[0]);
  });
});

app.post("/publicaciones", file.single("image"), (req, res) => {
  const { title, content, userId } = req.body;
  const image = req.file.buffer.toString("base64");

  db.query(
    "CALL createPost(?,?,?,?)",
    [title, content, image, userId],
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
