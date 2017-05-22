var app = angular.module('todoApp', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {templateUrl: 'partials/home.html'})
        .when('/addtask', {templateUrl: 'partials/addtask.html'})
        .when('/task/:id', {templateUrl : 'partials/edittask.html'})
        .when('/importance', {templateUrl: 'partials/importance.html'})
        .when('/importance/add', {templateUrl: 'partials/addimportance.html'})
        .when('/importance/:id', {templateUrl : 'partials/editimportance.html'})
        .otherwise({redirectTo : "/"})
});
