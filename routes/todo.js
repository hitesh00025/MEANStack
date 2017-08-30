var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    "text": String
});

const todoModel = mongoose.model('todo', todoSchema);

/* GET home page. */
router.post('/', function (req, res, next) {
    //Set up default mongoose connection
    mongoose.connect('mongodb://localhost/test');

    mongoose.models = {};
    mongoose.modelSchemas = {};


    let todo = new todoModel({"text": req.body.text});

    let p1 = new Promise(
        function (resolve, reject) {
            todo.save(function (err, todo) {

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
        todoModel.find({}, function (err, todolist) {
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


    todoModel.find({}, function (err, todolist) {
        if (err) return console.error(err);
        mongoose.connection.close();
        var todolistArray = [];
        todolist.forEach(function (val) {
            todolistArray.push(val._doc.text)

        });
        res.json(todolist);


    });


});

router.delete('/:id', function (req, res, next) {
    // //Set up default mongoose connection
    mongoose.connect('mongodb://localhost/test');
    mongoose.models = {};
    mongoose.modelSchemas = {};


    todoModel.remove({"_id": req.params.id}, function (err, todolist) {
        if (err) return console.error(err);
        todoModel.find({}, function (err, todolist) {
            if (err) return console.error(err);
            mongoose.connection.close();
            var todolistArray = [];
            todolist.forEach(function (val) {
                todolistArray.push(val._doc.text)

            });
            mongoose.connection.close();

            res.json(todolist);


        });

    });


});

module.exports = router;
