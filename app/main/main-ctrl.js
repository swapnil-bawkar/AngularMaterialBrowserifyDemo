'use strict';
/**
 * Created by sbawkar on 8/7/2015.
 */
module.exports = function(QuestionService, $state) {
    var MainController = this;
    MainController.questionNo = 1;
    this.showProgress = true;
    QuestionService.getQuestions().success(function (data) {
        QuestionService.questions = data.questions;
        MainController.progress =  MainController.questionNo / QuestionService.questions.length * 100;
        $state.go('question',{id: 1});
        MainController.showProgress = false;
    });

    this.showNext = function() {
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
    };

    this.reset = function() {
        this.disableNext = false;
        this.questionNo = 1;
        this.progress = this.questionNo / QuestionService.questions.length * 100;
        $state.go('question',{id: this.questionNo});
    };
};