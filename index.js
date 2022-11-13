const express = require("express");
const app = express();
const port = 8000;

app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
  }
  console.log("express server is up and running");
});
