var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
    //Set up default mongoose connection
    mongoose.connect('mongodb://localhost/test');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("we are connected");
        // we're connected!
    });

    mongoose.models = {};
    mongoose.modelSchemas = {};

   var peopleSchema = mongoose.Schema({
     "name":String,
     "address":String
   });

   var Kumar= mongoose.model('Kumar',peopleSchema);
   var hitesh = new Kumar({"name":"belk", "address":"61 new lawn ave"});

    hitesh.save(function (err,hitesh) {

   if (err){
     console.log(err);
   }
   console.log("Hitesh"+hitesh)

   });

    Kumar.find({"name":"belk"},function (err, Kumar) {
              if (err) return console.error(err);
              console.log(Kumar);
        mongoose.connection.close();
        res.json(Kumar);

    });



});

module.exports = router;
