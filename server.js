const express = require("express");
const path = require("path");
const app = express();

var bodyParser = require("body-parser");



const port = process.env.PORT || 8080;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(app.router);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/geolocation.js", function (req, res) {
  res.sendFile(path.join(__dirname + "/geolocation.js"));
});

app.get("/wardMap.png", function (req, res) {
  res.sendFile(path.join(__dirname + "/wardMap.png"));
});

app.listen(port, () =>
  console.log(
    `Example app listening at http://localhost:${port}  ${path.resolve(
      __dirname,
      "index.html"
    )}`
  )
);
