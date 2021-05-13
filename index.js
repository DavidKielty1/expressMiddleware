const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("homepage");
});

app.get("/dogs", (req, res) => {
  res.send("woofers");
});

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
