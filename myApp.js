let express = require("express");
let app = express();

console.log("Hello World");

app.use(__dirname + "/public", express.static());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
