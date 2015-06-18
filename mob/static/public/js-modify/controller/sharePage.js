function getQueryParams(name, url) {
    if (!url) url = location.href
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}
var sharePageCtrl = angular.module('baidu', ['taskService','getQRCodeService','memberRankService','wxshareService','jsConfigService']).controller('sharePageCtrl', ['$scope', 'TaskInfoWx','getQRCode','memberRank','sendEmail','wxshare', 'jsConfig', '$q', '$location', '$sce', '$http', function($scope, TaskInfoWx,getQRCode,memberRank,sendEmail,wxshare, jsConfig, $q, $location, $sce, $http) {
    taskId = getQueryParams('taskId', location.href);
    taskStatusId = getQueryParams('taskStatusId', location.href);
    originalOpenId = '';
    $scope.rankFlag = [false, false, false, false, false, false, false, false, false, false, false, false];
    $(".rank-board-background").bind("touch",function(event){
        event.stopPropagation();
        return false;
    });
    $(".rank-board").bind("touch",function(event){
        event.stopPropagation();
        return false;
    });
    $scope.rank = function(i) {
        return $scope.rankFlag[i];
    };
    $scope.showRanking = false;
    $scope.showQrcode = false;
    $scope.rankingShow = false;
    page = 1;
    $scope.showMoreRanks = false;
    $scope.closeRank = function() {
        $scope.rankingShow = false; 
    };
    var already_send = false;
    $scope.sendEmail = function() {
        if(already_send == false) {
            alert('邮件已经发送到团长邮箱');
            already_send = true;
            sendEmail.query({taskStatusId:taskStatusId},function(d){
                console.log(d);
            });
        }
        else {
            alert('请不要重复发送');
        }
    };
    $scope.showMore = function() {
        if($scope.rankingShow == false) {
            $scope.rankingShow = true; 
            memberRank.query({
                "taskStatusId":taskStatusId,
                "type":0,
            },function(d){
                $scope.rank = d.data;
            });
        }
        else {
            $scope.rankingShow = false; 
        }
    };
    $scope.showRankingBoard = function() {
        if ($scope.showRanking == true) {
            $(".rank-board").removeClass('rank-board-bigger');
            $(".rank-board").addClass('rank-board-smaller');
            $scope.showRanking = false;
            $("body").css({
                "overflow-y":"scroll"
            });
        } else {
            $scope.showRanking = true;
            $(".rank-board").removeClass('rank-board-smaller');
            $(".rank-board").addClass('rank-board-bigger');
            $("body").css({
                "overflow-y":"hidden"
            });
        }
    };
    $scope.showReadRank = function(i) {
        if ($scope.rankFlag[i] == false) {
            $scope.rankFlag[i] = true;
        } else {
            $scope.rankFlag[i] = false;
        }
    };
    key = 'taskStatusId' + taskStatusId;
    $scope.countShow = false;
    TaskInfoWx.query({
        taskId: taskId,
        taskStatusId: taskStatusId
    }, function(data) {
        $scope.isWxUrl = false;
        $scope.currentCommunityName = data.data.currentCommunityName;
        if (localStorage[key] != data.data.ReadCount) {
            localStorage[key] = data.data.myReadCount;
        } else {
            localStorage[key] = data.data.myReadCount;
        }
        originalOpenId = data.data.originalOpenId;
        $scope.getQrcode = function() {
            if($scope.showQrcode == false) {
                $scope.showQrcode = true;
                getQRCode.query({'taskStatusId':taskStatusId,'originalOpenId':originalOpenId},function(d){
                    $scope.qrcode = d.data.qrcodeImgUrl;
                });
            }
            else {
                $scope.showQrcode = false;
            }
        };    
        jsConfig.query({
            "url": location.href,
        }, function(dt) {
            wx.config(dt.data);
            wx.error(function(res) {
                console.log(res);
            });
            wx.ready(function() {
                wx.showOptionMenu();
                wx.onMenuShareQQ({
                    link: 'http://zan.baidu.com/wxshare/share.do?taskStatusId=' + taskStatusId + '&taskId=' + taskId + '&type=read&originalOpenId=' + originalOpenId,
                    title: data.data.name,
                    imgUrl: data.data.resourceUrl,
                    success: function() {
                        wxshare.query({
                            taskStatusId:taskStatusId,
                            taskId:taskId,
                            type:'share',
                            originalOpenId:originalOpenId
                        }); 
                        TaskInfoWx.query({
                            taskId: taskId,
                            taskStatusId: taskStatusId
                        }, function(d) {
                            $scope.taskReadData = d.data.taskReadData;
                            $scope.myCommunityUserReadData = d.data.myCommunityUserReadData;
                        });
                    }
                });
                wx.onMenuShareTimeline({
                    link: 'http://zan.baidu.com/wxshare/share.do?taskStatusId=' + taskStatusId + '&taskId=' + taskId + '&type=read&originalOpenId=' + originalOpenId,
                    title: data.data.name,
                    imgUrl: data.data.resourceUrl,
                    success: function() {
                        wxshare.query({
                            taskStatusId:taskStatusId,
                            taskId:taskId,
                            type:'share',
                            originalOpenId:originalOpenId
                        }); 
                        TaskInfoWx.query({
                            taskId: taskId,
                            taskStatusId: taskStatusId
                        }, function(d) {
                            $scope.taskReadData = d.data.taskReadData;
                            $scope.myCommunityUserReadData = d.data.myCommunityUserReadData;
                        });
                    }
                });
                wx.onMenuShareAppMessage({
                    link: 'http://zan.baidu.com/wxshare/share.do?taskStatusId=' + taskStatusId + '&taskId=' + taskId + '&type=read&originalOpenId=' + originalOpenId,
                    title: data.data.name,
                    imgUrl: data.data.resourceUrl,
                    success: function() {
                        wxshare.query({
                            taskStatusId:taskStatusId,
                            taskId:taskId,
                            type:'share',
                            originalOpenId:originalOpenId
                        }); 
                        TaskInfoWx.query({
                            taskId: taskId,
                            taskStatusId: taskStatusId
                        }, function(d) {
                            $scope.taskReadData = d.data.taskReadData;
                            $scope.myCommunityUserReadData = d.data.myCommunityUserReadData;
                        });
                    }
                });
            });
        });
        $scope.taskReadData = data.data.taskReadData;
        $scope.myCommunityUserReadData = data.data.myCommunityUserReadData;
        $scope.share = true;
        $scope.shareFadeOut = function() {
            $scope.share = false;
        };
        if(data.data.forwardUrl!=undefined&&data.data.forwardUrl.indexOf('mp.weixin.qq.com')==-1) {
            $scope.forwardUrl = $sce.trustAsResourceUrl(data.data.forwardUrl);
        }
        else {
            if(data.data.state == '4') {
                $scope.forwardUrl = $sce.trustAsResourceUrl('http://zan.baidu.com/res/wx/expire.html');
            }
            else {
                $scope.forwardUrl = $sce.trustAsResourceUrl('http://zan.baidu.com/res/wx/' + taskId + '.html');
            }
        }
    });
    setInterval(function() {
        TaskInfoWx.query({
            taskId: taskId,
            taskStatusId: taskStatusId
        }, function(d) {
            $scope.taskReadData = d.data.taskReadData;
            $scope.myCommunityUserReadData = d.data.myCommunityUserReadData;
            if (localStorage[key] != d.data.myReadCount) {
                $scope.countData = '阅读+' + (d.data.myReadCount - localStorage[key]);
                $scope.countShow = true;
                $('.new-message').addClass('messages');
                setTimeout(function() {
                    $scope.countShow = false;
                }, 1000);
                localStorage[key] = d.data.myReadCount;
            } else {
                localStorage[key] = d.data.myReadCount;
            }
        });
    }, 15000);
}])
.filter('defaultNull', function() {
    return function(data) {
        if (data.length == 0) {
            return '暂无数据';
        } else {
            return data;
        }
    }
});
sharePageCtrl.$inject = ['$scope', 'sharePageCtrl'];
