const express = require("express");
const path = require("path");
const app = express();
const {getList} = require("./getGoog.js")

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
  res.sendFile(path.join(__dirname + "/carolannesWardMap.png"));
});

app.get("/fancyMap.png", function (req, res) {
  res.sendFile(path.join(__dirname + "/fancyMap.png"));
});


app.get("/staticMap.png", function (req, res) {
  res.sendFile(path.join(__dirname + "/staticMap.png"));
});


app.get("/staticMap.html", function (req, res) {
  res.sendFile(path.join(__dirname + "/staticMap.html"));
});

app.get("/cache.png", function (req, res) {
  res.sendFile(path.join(__dirname + "/cache.png"));
});

app.get("/cache.svg", function (req, res) {
  res.sendFile(path.join(__dirname + "/cache.svg"));
});

app.get("/nearCache.svg", function (req, res) {
  res.sendFile(path.join(__dirname + "/nearCache.svg"));
});


app.get("/geotag.svg", function (req, res) {
  res.sendFile(path.join(__dirname + "/geotag.svg"));
});

app.get("/logo.png", function (req, res) {
  res.sendFile(path.join(__dirname + "/logo.png"));
});

app.get("/dynamic", function (req, res) {
  res.sendFile(path.join(__dirname + "/dynamic.html"));
});

app.get("/dynamicGeo.js", function (req, res) {
  res.sendFile(path.join(__dirname + "/dynamicGeo.js"));
});


app.get("/resize.js", function (req, res) {
  res.sendFile(path.join(__dirname + "/resize.js"));
});

app.get("/credentials.json", function (req, res) {
  res.sendFile(path.join(__dirname + "/credentials.json"));
});


app.get("/list.js", async function (req, res) {
  console.log("here")
  let list = await getList();
  console.log("did i get the list?"  + list)


  var out = `const list = ${JSON.stringify(list)}
   export default list
  `;

  res.setHeader('content-type', 'text/javascript');
  res.write(out);
  res.end();


  //res.sendFile(path.join(__dirname + "/credentials.json"));
});

app.use(express.static(__dirname +'/node_modules'));


app.listen(port, () =>
  console.log(
    `Example app listening at http://localhost:${port}  ${path.resolve(
      __dirname,
      "index.html"
    )}`
  )
);
