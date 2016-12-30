var App = angular.module('recippio', ['ngRoute']);

App.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/partials/_main.html',
      controller: 'IndexController'
    })
    .when('/register', {
      templateUrl: '/partials/_register.html',
      controller: 'RegisterController'
    })
    .when('/dashboard', {
    	templateUrl: '/partials/_dashboard.html',
    	controller: 'DashboardController'
    })
})
