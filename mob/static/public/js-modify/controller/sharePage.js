function getQueryParams(name,url) {
	if (!url) url = location.href
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
}
var sharePageCtrl = angular.module('baidu',['taskService','jsConfigService']).controller('sharePageCtrl',['$scope','TaskInfoWx','jsConfig','$q','$location','$sce','$http',function($scope,TaskInfoWx,jsConfig,$q,$location,$sce,$http){
    taskId = getQueryParams('taskId',location.href);
    taskStatusId = getQueryParams('taskStatusId',location.href);
    TaskInfoWx.query({taskId:taskId},function(data){
        $scope.forwardUrl = $sce.trustAsResourceUrl(data.data.forwardUrl);
    });

	jsConfig.query({
		"url":location.href
	},function(data){
		wx.config(data.data);
		wx.error(function(res){
			console.log(res);
		});
		wx.ready(function(){
            wx_title = $('ifream > title').html();
            if (!wx_title.length) {
                wx_title = "百度社团赞助平台";
            }
            wx.onMenuShareTimeline({
                link : '/wxshare/share.do?taskStatusId='+taskStatusId+'&taskId='+taskId,
                title : $('ifream > title').html(),
                success: function() {
                    TaskInfoWx.query({taskId:taskId},function(data){
                        $scope.forwardRanking ;
                    });   
                }
            });
            wx.onMenuShareAppMessage({
                link : '/wxshare/share.do?taskStatusId='+taskStatusId+'&taskId='+taskId,
                title : $('ifream > title').html(),
                success : function() {
                       
                }
            });
        });
	});
}]);
sharePageCtrl.$inject = ['$scope','sharePageCtrl'];
