	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'SAP/pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'SAP/pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'SAP/pages/contact.html',
				controller  : 'contactController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope, $http) {
		// create a message to display in our view
	  $http({method: 'GET', url: 'http://localhost:3412/rest'}).
	    success(function(data, status, headers, config) {

	      $scope.message = data;

	    }).
	    error(function(data, status, headers, config) {

	    });
	});

	scotchApp.controller('aboutController', function($scope,$http) {
	  $http({method: 'GET', url: 'http://localhost:3412/rest/0'}).
	    success(function(data, status, headers, config) {

	      $scope.message = data;

	    }).
	    error(function(data, status, headers, config) {

	    });
	});

	scotchApp.controller('contactController', function($scope,$http) {
	  $http({method: 'GET', url: 'http://localhost:3412/rest/1'}).
	    success(function(data, status, headers, config) {

	      $scope.message = data;

	    }).
	    error(function(data, status, headers, config) {

	    });
	});