var freshGuideCtrl = angular.module('baidu',['ngTouch']).controller('freshGuideCtrl',['$scope','$q',function($scope,$q){
	$scope.change = function(num) {
		console.log(num);
		if(num == 2) {
			console.log(num);
			$(".second").css({
				"z-index":"6"
			});
			$(".second").addClass("tab-left");
		}
		if(num == 3) {
			console.log(num);
			$(".third").css({
				"z-index":"7"
			});
			$(".third").addClass("tab-left");
		}
		if(num == 4) {
			console.log(num);
			$(".forth").css({
				"z-index":"8"
			});
			$(".forth").addClass("tab-left");
		}
		if(num == 5) {
			location.href = "/mob/index.do";
		}
	};
}]);
freshGuideCtrl.$inject = ['$scope','freshGuideCtrl'];
