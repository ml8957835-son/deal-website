const db = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
console.log("CORS ENABLED");

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.get("/deals", (req, res) => {
  const deals = db.prepare("SELECT * FROM deals").all();
  res.json(deals);
});
app.post("/deals", (req, res) => {
  const { title, store, discount, description } = req.body;

  const result = db.prepare(`
    INSERT INTO deals (title, store, discount, description)
    VALUES (?, ?, ?, ?)
  `).run(title, store, discount, description);

  res.json({
    id: result.lastInsertRowid,
    title,
    store,
    discount,
    description
  });
});
app.delete("/deals/:id", (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare("DELETE FROM deals WHERE id = ?");
  const result = stmt.run(id);

  res.json({
    success: true,
    deleted: result.changes,
  });
});
app.listen(5000, () => {
  console.log("Server started on port 5000");
});