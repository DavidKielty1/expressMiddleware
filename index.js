const express = require("express");
const app = express();
const morgan = require("morgan");

const AppError = require("./AppError");

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
  }
  throw new AppError("Password Required!", 401);
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

app.get("/admin", (req, res) => {
  throw new AppError("You are not an admin", 403);
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND");
});

// app.use((err, req, res, next) => {
//   console.log("****************************");
//   console.log("************ERROR***********");
//   console.log("****************************");
//   console.log(err);
//   next(err);
// });

app.use((err, req, res, next) => {
  const { status = 500, message = "Something Went Wrong" } = err;
  res.status(status).send(message);
});

app.listen(4000, () => {
  console.log("Listening on Port 4000");
});
