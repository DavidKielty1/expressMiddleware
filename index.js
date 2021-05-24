const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("tiny"));

app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("I LOVE DOGS");
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennugget") {
    next();
  } else {
    // res.send("Sorry you need a password!");
    throw new Error("Password Required!");
  }
};

app.get("/", (req, res) => {
  console.log(`Request date: ${req.requestTime}`);
  res.send("homepage");
});

app.get("/error", (req, res) => {
  chicken.fly();
});

app.get("/dogs", (req, res) => {
  console.log(`Request date: ${req.requestTime}`);
  res.send("woofers");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send(
    "sometimes i wear headphones in public so idont have to talk to anyone"
  );
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND");
});

app.listen(4000, () => {
  console.log("Listening on Port 4000");
});
