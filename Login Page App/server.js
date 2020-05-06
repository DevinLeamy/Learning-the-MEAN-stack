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


// INFO
/*
RESTful API is composed of four parts:
Endpoint - The url you request from
Method - The type of request you send to the server
Headers - Used to provide information to both the client and the server
Data or Body or Message - Information you want to send to the server

Types of Requests:
Get - Used to GET a resource from a server
Post - Used to CREATE a new resource on a server. The server creates a new entry in a database
Put and Patch - Used to UPDATE a resource on a server. The server updates the entry in a database
Delete - Used to DELETE a resource from a server. The server deletes the entry from the database

Using these requests you can preform the CRUD operations:
C - CREATE
R - Read
U - Update
D - Delete

HTTP Status Codes and Error Messages:
200+ - The request was successful
300+ - The request is redirected to another url
400+ - An error that originated from the client has occured
500+ - An error that originated from the server has occured
*/
