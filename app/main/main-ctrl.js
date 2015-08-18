/**
 * Created by sbawkar on 8/7/2015.
 */
(function() {
    'use strict';

    //var xml2json = require('../shared/jsonxml/xml2json.js');
    module.exports = function(QuestionService, $state) {
        var MainController = this;
        QuestionService.getQuestions().success(function (data) {
            QuestionService.questions = data.questions;
            $state.go('question',{id: 1});
        });

        function showNext() {
            if(!QuestionService.isAnswered()){
                return;
            }
            if(this.questionNo === QuestionService.questions.length - 1){
                this.disableNext = true;
            } else {
                this.disableNext = false;
            }
            this.questionNo++;
            if(this.questionNo < QuestionService.questions.length + 1){
                this.progress = this.questionNo / QuestionService.questions.length * 100;
                $state.go('question',{id: this.questionNo});
            }
        }

        var reset = function() {
            this.disableNext = false;
            this.questionNo = 1;
            this.progress = this.questionNo / QuestionService.questions.length * 100;
            $state.go('home');
        };

        return {
            questionNo: 1,
            showProgress: false,
            progress: 0,
            reset: reset,
            showNext: showNext
        };
    };
})();