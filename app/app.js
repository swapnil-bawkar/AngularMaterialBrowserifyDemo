(function() {
	'use strict';

	var angular = require('angular');
	require('angular-material');
	require('angular-aria');
	require('angular-ui-router');
	require('./question/app.js');
	require('./main/top-bar.html');
	require('./main/bottom-bar.html');

	angular.module('myApp', ['ngMaterial', 'ngAria', 'ui.router', 'myApp.question', 'templates'])
		.config(stateProvider)
		.config(themeProvider)
		.service('QuestionService', require('./question/question-service.js'))
		.controller('MainController', require('./main/main-ctrl.js'))
		.directive('bottomBar', bottomBarDirective)
		.directive('topBar', topBarDirective);

	stateProvider.$inject = ['$stateProvider', '$urlRouterProvider'];
	function stateProvider($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
		$stateProvider.state('home', {
			url: '/home',
			controller: 'MainController',
			controllerAs: 'mainCtrl'
		});
	}

	themeProvider.$inject = ['$mdThemingProvider'];
	function themeProvider($mdThemingProvider) {
		$mdThemingProvider.theme('default').primaryPalette('cyan');
	}

	function bottomBarDirective() {
		return {
			restrict: 'E',
			templateUrl: 'bottom-bar.html'
		};
	}

	function topBarDirective() {
		return {
			restrict: 'E',
			templateUrl: 'top-bar.html'
		};
	}
})();