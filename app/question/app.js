(function() {
    'use strict';

    require('./question.html');
    require('./user-result.html');

    angular.module('myApp.question', ['templates'])

        .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
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
        }])
        .controller('QuestionController',
            ['QuestionService', '$state', 'question', require('./controller.js')])
        .directive('userResult', function () {
            return {
                restrict: 'E',
                templateUrl: 'user-result.html'
            };
        });
})();