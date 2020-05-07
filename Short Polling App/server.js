var express = require("express");
var path = require('path');
var app = express();
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

app.listen(port, function() {
  console.log("Server started on port: " + port);
});
