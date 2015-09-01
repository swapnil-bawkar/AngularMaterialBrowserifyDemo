(function() {
	'use strict';

	require('./question.html');
	require('./user-result.html');

	angular.module('myApp.question', ['templates'])
		.config(stateProvider)
		.controller('QuestionController', require('./controller.js'))
		.directive('userResult', userResultDirective);

	stateProvider.$inject = ['$stateProvider', '$urlRouterProvider'];
	function stateProvider($stateProvider, $urlRouterProvider) {
		$stateProvider.state('question', {
			url: '/question/:id',
			templateUrl: 'question.html',
			controller: 'QuestionController',
			controllerAs: 'questionCtrl',
			resolve: {
				question: ['$stateParams','QuestionService', function($stateParams, QuestionService) {
					return  QuestionService.getQuestion($stateParams.id - 1);
				}]
			}
		});
	}

	function userResultDirective() {
		return {
			restrict: 'E',
			templateUrl: 'user-result.html'
		};
	}
})();