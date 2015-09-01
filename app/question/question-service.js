/**
 * Created by sbawkar on 8/18/2015.
 */
(function(){
	'use strict';

	QuestionService.$inject = ['$http'];
	function QuestionService($http) {
		var service = {
			questions: [],
			question: null,
			getQuestions: getQuestions,
			getQuestion: getQuestion,
			isAnswered: isAnswered
		};
		return service;

		function getQuestions() {
			return $http({
				method: 'GET',
				url: './data/question.json'
			})/*.success(function(data) {
				var json = xml2json(data, ' ');
				console.log(json);
				console.log(json2xml(eval('json='+json), '\n'));
			})*/;
		};

		function getQuestion(index) {
			this.question = this.questions[index];
			return this.question;
		};

		function isAnswered() {
			return this.question.answer;
		};
	};

	module.exports = QuestionService;
})();