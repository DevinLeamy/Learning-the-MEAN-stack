var express = require("express");
var path = require('path');
var socket = require("socket.io");
var app = express();
var http = require("http");
var bodyParser = require("body-parser");
var messageApi = require("./routes/messages");
var mongojs = require("mongojs");
var address = 'mongodb+srv://test:test@messenger-db-jzhdw.mongodb.net/messages?retryWrites=true&w=majority';
var database = mongojs(address, ['messages_A', 'messages_B']);

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
  socket.on("send-message-A", function(data) {
    console.log("Server received new message");
    database.messages_A.save(data, function(err, message) {
      if (err) {
        console.log("ERROR POSTING NEW MESSAGE");
      } else {
        console.log("SUCCESSFULLY POSTED NEW USER");
      }
    })
    io.sockets.emit("receive-message-A", data);
  })
  socket.on("send-message-B", function(data) {
    console.log("Server received new message");
    database.messages_B.save(data, function(err, message) {
      if (err) {
        console.log("ERROR POSTING NEW MESSAGE");
      } else {
        console.log("SUCCESSFULLY POSTED NEW USER");
      }
    })
    io.sockets.emit("receive-message-B", data);
  })
})

