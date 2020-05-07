var express = require("express");
var path = require('path');
var socket = require("socket.io");
var app = express();
var http = require("http");
var bodyParser = require("body-parser");
var messageApi = require("./routes/messages");

var port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', messageApi);

app.use(express.static(path.join(__dirname, "dist")));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"));
})

var server = http.Server(app)

server.listen(port, function() {
  console.log("Server started on port: " + port);
});

io = socket(server);

io.on("connect", function(socket) {
  console.log("Socket connected to the client");
  socket.on("send-message", function(data) {
    console.log("Server received new message");
    io.sockets.emit("receive-message", data);
  })
})

