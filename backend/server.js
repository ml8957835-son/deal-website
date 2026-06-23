const express = require("express");

const app = express();

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