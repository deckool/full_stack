	// create the module and name it booksApp
	var booksApp = angular.module('booksApp', ['ngRoute']);

	// configure our routes
	booksApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'SPA/pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about/:restId', {
				templateUrl : 'SPA/pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'SPA/pages/contact.html',
				controller  : 'contactController'
			});
	});

	// create the controller and inject Angular's $scope
	booksApp.controller('mainController', function($scope, $http) {
		// create a message to display in our view
	  $http({method: 'GET', url: 'http://organicorange.ro:8003/rest'}).
	    success(function(data, status, headers, config) {

	      $scope.messages = data;

	    }).
	    error(function(data, status, headers, config) {

	    });
	});

	booksApp.controller('aboutController', function($scope,$http,$routeParams) {
	  $http({method: 'GET', url: 'http://organicorange.ro:8003/rest/'+$routeParams.restId}).
	    success(function(data, status, headers, config) {

	      $scope.message = data;

	    }).
	    error(function(data, status, headers, config) {

	    });
	});

	booksApp.controller('contactController', function($scope,$http) {
	  $http({method: 'GET', url: 'http://organicorange.ro:8003/rest/1'}).
	    success(function(data, status, headers, config) {

	      $scope.messages = data;

	    }).
	    error(function(data, status, headers, config) {

	    });
	});