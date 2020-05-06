var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var loginApi = require("./routes/login");

var app = express();
var port = 3000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Path to the static dist directory that stores our compiled angular app
app.use(express.static(path.join(__dirname, "dist")));

//Set route to login api
app.use("/api", loginApi);

//Renders our angular apps root index.html file
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"));
})


app.listen(port, function() {
  console.log("Server started on port " + port);
})
