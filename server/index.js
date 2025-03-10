import express from "express";
import mysql, { createConnection } from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();

const db = createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.use(express.json());
app.use(cors());

app.get("/api/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/api/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
});

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

app.post("/api/books", upload.single("cover"), (req, res) => {
  const coverPath = req.file ? `/uploads/${req.file.filename}` : null;

  const q =
    "INSERT INTO books (`title`, `description`, `cover`, `price`) VALUES (?)";
  const values = [req.body.title, req.body.description, coverPath, req.body.price];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully!");
  });
});

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

app.delete("/api/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res
      .status(200)
      .json({ message: "Book has been deleted successfully!" });
  });
});

app.put("/api/books/:id", upload.single("cover"), (req, res) => {
  const bookId = req.params.id;

  console.log("Received update request for book ID:", bookId);
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);

  let coverUrl = req.body.cover; // Keep old cover if no new file is uploaded

  if (req.file) {
    coverUrl = req.file.filename; // Save new filename if uploaded
  }

  const q =
    "UPDATE books SET title=?, description=?, price=?, cover=? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    coverUrl,
    bookId, // Ensure bookId is inside the array
  ];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Database update error:", err);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res
      .status(200)
      .json({ message: "Book has been updated successfully!" });
  });
});


app.listen(3000, () => {
  console.log("backend running successfully!");
});
