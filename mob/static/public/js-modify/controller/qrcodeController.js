function getQueryParams(name,url) {
	if (!url) url = location.href
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
}
var qrcodeCtrl = angular.module('baidu',['communService','taskService','jsConfigService','ngTouch']).controller('qrcodeCtrl',['TaskInfo','CommunInfo','jsConfig','$scope','$q',function(TaskInfo,CommunInfo,jsConfig,$scope,$q){
	$scope.width =  document.body.clientWidth*0.6;
	taskId = getQueryParams("taskId",location.href);
	entityId = getQueryParams("entityId",location.href);
	commun_id = getQueryParams("commun_id",location.href);
	if(taskId > 0) {
		$scope.show_type = false;
		$scope.share_text_show = false;
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
		$scope.taskInfo = TaskInfo.query({taskId:taskId},function(d){
			for (i in d.data.taskStatusData) {
				console.log(entityId);
				if(d.data.taskStatusData[i].entityId == entityId) {
					$scope.url = d.data.taskStatusData[i].qeCodePicUrl;
				}
			}
		});
	}
	else if(commun_id > 0)  {
		$scope.show_type = true;
		$scope.message1 = "将此二维码发给小伙伴";
		$scope.message2 = "即可拉他入团，干一票大的呦！";
		$scope.share_text_show = true;
		$scope.commun = CommunInfo.query({commun_id:commun_id},function(d){
			$scope.url = d.data.qrcode;
			jsConfig.query({
				"url":location.href
			},function(data){
				wx.config(data.data);
                wx.showOptionMenu();
				wx.error(function(res){
					console.log(res);
				});
				console.log(data.data);
				wx.ready(function(){
					wx.onMenuShareTimeline({
						link:location.href,
						title:"来哥的社团，跟哥一起闯江湖，拿积（现）分（金）吧！",
						imgUrl:$scope.url,
					});
					wx.onMenuShareAppMessage({
						link:location.href,
						title:"百度社团赞助平台",
						desc:"来哥的社团，跟哥一起闯江湖，拿积（现）分（金）吧！",
						imgUrl:$scope.url,
					});			
				});
			});
		});
	}
	if(localStorage['hideBackground-commun']) {
		$scope.background_hide = true;
	}
	$scope.hideBackground = function() {
		localStorage['hideBackground-commun'] = 1;	
		$scope.background_hide = true;
	};
}]);
qrcodeCtrl.$inject = ['$scope','qrcodeCtrl'];
