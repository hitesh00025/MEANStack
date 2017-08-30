// public/core.js
var scotchTodo = angular.module('scotchTodo', ['ngRoute']);
scotchTodo.config(function ($routeProvider) {


    // route for the home page
    $routeProvider.when('/', {
        templateUrl : 'pages/index.html',
        controller  : 'mainController'
    })

    // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        });
});



scotchTodo.controller( 'mainController',function($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/todos   ')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        console.log($scope.formData);
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log("HK",data.list);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});


scotchTodo.controller('aboutController', function($scope) {
    $scope.message = 'Made by hitesh Kumar';
});

scotchTodo.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});
