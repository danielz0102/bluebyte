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
        userId: userData.id,
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

    if (result.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    return res.json({ message: "Login exitoso", userId: result[0].id });
  });
});
