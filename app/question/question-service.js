/**
 * Created by sbawkar on 8/18/2015.
 */
(function(){
    'use strict';

    module.exports = function($http) {
        var QuestionService = {};
        QuestionService.getQuestions = function () {
            return $http({
                method: 'GET',
                url: '../data/question.json'
            })/*.success(function(data) {
                var json = xml2json(data, ' ');
                console.log(json);
                console.log(json2xml(eval('json='+json), '\n'));
            })*/;
        };

        QuestionService.getQuestion = function (index) {
            this.question = QuestionService.questions[index];
            //angular.copy(QuestionService.questions[index],this.question);
            return this.question;
        };
        QuestionService.isAnswered = function () {
            return this.question.answer;
        };
        return QuestionService;
    };
})();