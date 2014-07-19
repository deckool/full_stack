var booksApp = angular.module('ionicApp', ['ionic'])

booksApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.facts', {
      url: "/facts/:restId",
      views: {
        'home-tab': {
          templateUrl: "facts.html",
          controller: 'AboutController'
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "facts2.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "about.html",
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "nav-stack.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "contact.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");

})

/*controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
});*/

  // create the controller and inject Angular's $scope
booksApp.controller('HomeTabCtrl', function($scope, $http) {
  // create a message to display in our view
  $http({method: 'GET', url: 'http://localhost:8003/rest'}).
    success(function(data, status, headers, config) {
       $scope.messages = data;
    }).
    error(function(data, status, headers, config) {
    });
});

booksApp.controller('AboutController', function($scope,$http,$stateParams) {
  $http({method: 'GET', url: 'http://localhost:8003/rest/'+$stateParams.restId}).
    success(function(data, status, headers, config) {
      $scope.message = data;
      console.log(data);
    }).
    error(function(data, status, headers, config) {
    });
});