(function() {
	'use strict';

	QuestionController.$inject = ['QuestionService', '$state', 'question'];
	function QuestionController(QuestionService, $state, question) {
		var vm = this;

		vm.question = question;
		vm.answerClick = answerClick;

		checkData();

		function checkData() {
			if (QuestionService.questions.length === 0) {
				$state.go('home');
			}
		}

		function answerClick(answer) {
			this.question.answer = answer;
			if (answer === this.question.correctanswer) {
				this.question.correct = true;
			} else {
				this.question.correct = false;
			}
		};
	};
	module.exports = QuestionController;
})();