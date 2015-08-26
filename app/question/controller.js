(function() {
    'use strict';

    module.exports = function (QuestionService, $state, question) {
        var questionCtrl = this;
        if (!QuestionService.questions) {
            $state.go('home');
            return;
        }
        questionCtrl.question = question;
        this.answerClick = function (answer) {
            questionCtrl.question.answer = answer;
            if (answer === questionCtrl.question.correctanswer) {
                questionCtrl.question.correct = true;
            } else {
                questionCtrl.question.correct = false;
            }
        };
    };
})();