var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
  $routeProvider
  .when('/dashboard',{
      templateUrl: '../partials/dashboard.html',
      controller: 'loginController'
    })
    .when('/',{
        templateUrl: '../partials/login.html',
        controller: 'loginController'
    })
    .when('/newPoll',{
        templateUrl: '../partials/newPoll.html',
        controller: 'loginController'
    })
    .when('/poll/:id',{
        templateUrl: '../partials/pollInfo.html',
        controller: 'pollController'
    })
});
