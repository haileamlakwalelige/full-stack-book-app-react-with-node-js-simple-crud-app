import express from "express";
import mysql, { createConnection } from "mysql2";
import dotenv from "dotenv";
import cors from "cors";

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

app.post("/api/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`, `description`, `cover`, `price`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully!");
  });
});

app.listen(3000, () => {
  console.log("backend running successfully!");
});
