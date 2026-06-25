const db = require("./db");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const bcrypt = require("bcrypt");
const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
 console.log("CORS ENABLED");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

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

app.post("/claims", verifyToken, (req, res) => {
  const { dealId } = req.body;

  const userId = req.user.id;

  const result = db.prepare(`
    INSERT INTO claims (dealId, userId)
    VALUES (?, ?)
  `).run(dealId, userId);

  res.json({
    id: result.lastInsertRowid,
    dealId,
    userId,
  });
});


app.get("/claims", (req, res) => {
  const claims = db.prepare(`
    SELECT
      claims.id,
      deals.title,
      deals.store,
      deals.discount,
      deals.description
    FROM claims
    JOIN deals ON claims.dealId = deals.id
  `).all();

  res.json(claims);
});
app.get("/my-claims", verifyToken, (req, res) => {
  const claims = db.prepare(`
    SELECT
      claims.id,
      deals.title,
      deals.store,
      deals.discount,
      deals.description
    FROM claims
    JOIN deals
      ON claims.dealId = deals.id
    WHERE claims.userId = ?
  `).all(req.user.id);

  res.json(claims);
});
 
app.get("/users", (req, res) => {
  const users = db.prepare(`
    SELECT
      id,
      name,
      email,
      isAdmin
    FROM users
  `).all();

  res.json(users);
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.prepare(`
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `).run(name, email, hashedPassword);

    res.json({
      success: true,
    });
  } catch {
    res.status(400).json({
      message: "Email already exists",
    });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare(`
    SELECT *
    FROM users
    WHERE email = ?
    `).get(email);
  
   
    if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
   const validPassword = await bcrypt.compare(
  password,
  user.password
);
if (!validPassword) {
  return res.status(401).json({
    message: "Invalid credentials",
  });
}

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    "secretkey"
  );

  res.json({
    token,
  });
});
app.listen(5000, () => {
  console.log("Server started on port 5000");
});