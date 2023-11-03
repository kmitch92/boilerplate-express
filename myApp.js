let express = require("express");
let app = express();
require("dotenv").config();
let bodyParser = require("body-parser");

app.use((req, res, next) => {
  console.log(req.method, req.path, req.ip);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/name", (req, res) => {
  const { first: firstName, last: lastName } = req.query;
  res.json({ name: `${firstName} ${lastName}` });
});

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/name", (req, res) => {
  res.json({ name: `${req.body.first} ${req.body.last}` });
});

module.exports = app;
