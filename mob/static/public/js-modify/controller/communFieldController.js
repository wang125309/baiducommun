function getQueryParams(name,url) {
	if (!url) url = location.href
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
}
var CommunFieldCtrl = angular.module('baidu',['communService','monthRankingService','jsConfigService','ngTouch']).controller('CommunFieldCtrl',['$scope','Communs','monthRanking','jsConfig','$q',function($scope,Communs,monthRanking,jsConfig,$q){
		$scope.footerMenu = {
			isopen : false
		};
		jsConfig.query({
			"url":location.href
		},function(data){
			wx.config(data.data);
			wx.error(function(res){
				console.log(res);
			});
			wx.ready(function(){
				wx.hideOptionMenu();
			});
		});
		$scope.communs = Communs.query();
		$scope.toggleFooterMenuDropDown = function() {
			$scope.footerMenu.isopen = !$scope.footerMenu.isopen;
		};
		$scope.goJoin = function() {
			location.href = "/mob/joinCommun.do";
		};
		$scope.show_instruction = function() {
			$scope.showInstruction = !$scope.showInstruction;
		};

		$scope.monthRanking = monthRanking.query({size:10},function(data){
			if(data.error_no != 0) {
				location.href = location.href;
			}
			else {
				if(data.data.ranking_list.length!=0) {
					$scope.ranklist_show = false;
				}
				else {
					$scope.ranklist_show = true;
				}
			}
		});
		$scope.goCreate = function() {
			location.href = "/mob/createCommun.do";
		};
		$scope.getTaskInfo = function(id) {
			location.href="/mob/taskInfo.do?taskId="+id;
		};
		$scope.goIndex = function() {
			location.href="/mob/index.do";
		};
		$scope.goMy = function() {
			location.href="/mob/personCenter.do";
		};
		$scope.activeTab = 'commun';
		$scope.goCommun = function(num) {
			location.href="/mob/communCenter.do?commun_id="+num;
		};
		$scope.goCommunDetail = function($event,num) {
			$event.preventDefault();
			location.href="/mob/communCenter.do?commun_id="+num;
		};
		$scope.goCommunField = function($event) {
			$event.preventDefault();
			location.href="/mob/communField.do";
		};
}]);
CommunFieldCtrl.$inject = ['$scope','CommunFieldCtrl'];
