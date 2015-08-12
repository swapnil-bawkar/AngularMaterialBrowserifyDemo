'use strict';

var angular = require('angular');
require('angular-material');
require('angular-aria');
require('angular-ui-router');
require('./question/question.js');
require('./main/top-bar.html');
require('./main/bottom-bar.html');
// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngMaterial',
    'ngAria',
    'ui.router',
    'myApp.question',
    'templates'
])
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/home");
        $stateProvider.state('home', {
            url: '/home',
            controller: 'MainController',
            controllerAs: 'mainCtrl'
        });
    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('cyan');
    })
    .service('QuestionService', [ '$http', function($http){
        var QuestionService = {};
        QuestionService.getQuestions = function() {
            return $http({
                method: 'GET',
                url: '../data/question.json'
            });
        };
        QuestionService.getQuestion = function(index) {
            this.question = QuestionService.questions[index];
            //angular.copy(QuestionService.questions[index],this.question);
            return this.question;
        };
        QuestionService.isAnswered = function() {
            return this.question.answer;
        };
        return QuestionService;
    }])
    .controller('MainController', ['QuestionService','$state', require('./main/main-ctrl.js')])
    .directive('bottomBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'bottom-bar.html'
        };
    })
    .directive('topBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'top-bar.html'
        };
    });
