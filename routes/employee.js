var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    "employeename": String,

    "employeeid":Number,

    "employeeage":String
});

const empModel = mongoose.model('emp', empSchema);

/* GET home page. */
router.post('/', function (req, res, next) {
    //Set up default mongoose connection
    mongoose.connect('mongodb://localhost/test');

    mongoose.models = {};
    mongoose.modelSchemas = {};


    let emp = new empModel({"employeename": req.body.employeename,
    "employeeid":Number(req.body.employeeid),
    "employeeage":req.body.employeeage});

    let p1 = new Promise(
        function (resolve, reject) {
            emp.save(function (err, todo) {

                if (err) {
                    console.log(err);
                    reject(err)
                }

                if (todo) {
                    resolve(todo)
                }

            });
        });
    p1.then(function (val) {
        empModel.find({}, function (err, todolist) {
            if (err) return console.error(err);
            mongoose.connection.close();
            res.json(todolist);


        });
    }, function (rejection) {
        res.json(rejection)

    });


});

router.get('/', function (req, res, next) {
    //Set up default mongoose connection
    mongoose.connect('mongodb://localhost/test');

    mongoose.models = {};
    mongoose.modelSchemas = {};


        empModel.find({}, function (err, todolist) {
            if (err) return console.error(err);
            mongoose.connection.close();
            res.json(todolist);

        });


});
module.exports = router;