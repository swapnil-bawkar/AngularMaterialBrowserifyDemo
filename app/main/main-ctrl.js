/**
 * Created by sbawkar on 8/7/2015.
 */
(function() {
	'use strict';

	//var xml2json = require('../shared/jsonxml/xml2json.js');
	MainController.$inject = ['QuestionService', '$state'];
	function MainController(QuestionService, $state) {
		var vm = this;

		vm.questionNo = 1;
		vm.showProgress = false;
		vm.progress = 0;
		vm.reset = reset;
		vm.showNext = showNext;

		activate();

		function activate() {
			/**
			 * Step 1
			 * Ask the getQuestions function for the
			 * question data and wait for the promise
			 */
			return getQuestions().then(function() {
				/**
				 * Step 4
				 * Perform an action on resolve of final promise
				 */
				console.log('Activated question View');
			});

		}

		function getQuestions() {
		   /**
			* Step 2
			* Ask the data service for the data and wait
			* for the promise
		   	*/
			return QuestionService.getQuestions()
					.then(function (response) {
						/**
						* Step 3
						* set the data and resolve the promise
						*/
						QuestionService.questions = response.data.questions;
						$state.go('question',{id: 1});
					});
		}

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

		function reset() {
			this.disableNext = false;
			this.questionNo = 1;
			this.progress = this.questionNo / QuestionService.questions.length * 100;
			$state.go('home');
		};

	};

	module.exports = MainController;
})();