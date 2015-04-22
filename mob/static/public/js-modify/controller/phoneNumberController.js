function getQueryParams(name,url) {
	if (!url) url = location.href
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
}
var PhoneNumberCtrl = angular.module('baidu',['finishJumpService','getLotteryListService','ngTouch']).controller('PhoneNumberCtrl',['finishJump','getLotteryList','$scope','$q',function(finishJump,getLotteryList,$scope,$q){
	id = getQueryParams("id",location.href);
	$scope.text = "";
	$scope.add = function($event,num) {
		if($scope.text.length < 11) {
			$scope.text += num;
		}
		else {
			return ;
		}
	};
	$scope.submitPhoneNumber = function() {
		if($scope.text.length < 11) {
			alert("请输入正确的手机号");
		}
		else {
			finishJump.query({phone_num:$scope.text,id:id},function(d){
				location.href = d.data;	
			});
		};
	};
	$scope.read = getLotteryList.query(function(d){
		$scope.read = d;
		colors = ['#0bc344','#6618be','#1e1b22','#d64418','#3017ab','#17ab1e','#12d9e5','#b112e5','#f7ef0e','#a29f56'];
		$scope.read.text = [];

		for(i=0;i<d.root.length;i++) {
			t = {
				color:colors[Math.ceil(Math.random()*10)],
				text:d.root[i].phoneNum.substring(0,2)+"****"+d.root[i].phoneNum.substring(6,10)+" 获得"+d.root[i].prize
			}
			$scope.read.text.push(t);
		}
		console.log($scope.read.text);
	});
	$scope.delete = function($event) {
		$scope.text = $scope.text.substring(0,$scope.text.length-1);
	};

}])
.directive('delete',function(){
	return  {
		link : function(scope,element,attr) {
			element.on('longTap',function(){
				scope.text = "";
				scope.$apply();
			});
		}
	}
});
PhoneNumberCtrl.$inject = ['$scope','PhoneNumberCtrl'];
