const express = require("express");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
console.log("CORS ENABLED");

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.get("/deals", (req, res) => {
  res.json([
    {
      title: "Nike Shoes",
      store: "Nike",
      discount: "50%",
      description: "Summer sale"
    },
    {
      title: "Dell Laptop",
      store: "Dell",
      discount: "20%",
      description: "Student offer"
    }
  ]);
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});