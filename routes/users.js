var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    //Import the mongoose module


  res.send('respond with a resource');
});

module.exports = router;
