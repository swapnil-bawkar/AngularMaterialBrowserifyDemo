'use strict';

require('./question.html');
require('./user-result.html');
angular.module('myApp.question', ['templates'])

    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider.state('question', {
            url: '/question/:id',
            templateUrl: 'question.html',
            controller: 'QuestionController',
            controllerAs: 'questionCtrl'
        });
    })
    .controller('QuestionController', [ '$stateParams','QuestionService', '$state',
        function($stateParams, QuestionService, $state) {
            var questionController = this;
            if(!QuestionService.questions){
                $state.go('home');
                return;
            }
            questionController.questions = QuestionService.questions;
            questionController.question = QuestionService.getQuestion($stateParams.id - 1);
            this.answerClick = function(answer) {
                questionController.question.answer = answer;
                if(answer === questionController.question.correctanswer){
                    questionController.question.correct = true;
                } else {
                    questionController.question.correct = false;
                }
            };
        }])
    .directive('userResult', function() {
        return {
            restrict: 'E',
            templateUrl: 'user-result.html'
        };
    });
