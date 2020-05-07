var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var address = 'mongodb+srv://test:test@messenger-db-jzhdw.mongodb.net/messages?retryWrites=true&w=majority';
var database = mongojs(address, ['messages']);
database.messages.remove({})

console.log("DATABASE OBJECT CREATED");

//Get Messages
router.get("/messages", function(req, res) {
  console.log("GETTING ALL USERS");
  database.messages.find(function(err, messages) {
    if (err) {
      res.send(err);
      console.log("ERROR GETTING MESSAGES");
    } else {
      res.json(messages);
      console.log("SUCCESSFULLY GOT MESSAGES");
    }
  })
})

//Post new message
router.post("/post", function(req, res) {
  console.log("POSTING NEW MESSAGE");
  var message = req.body;
  if (!message.message) {
    console.log("ERROR POSTING NEW MESSAGE");
    //Client side error
    res.status(400);
    res.json({
      "ERROR": "Bad Data"
    })
  } else {
    database.messages.save(message, function(err, message) {
      if (err) {
        console.log("ERROR POSTING NEW MESSAGE");
        res.send(err);
      } else {
        res.json(message);
        console.log("SUCCESSFULLY POSTED NEW USER");
      }
    })
  }
})

module.exports = router;
