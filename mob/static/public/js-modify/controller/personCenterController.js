function getQueryParams(name,url) {
	if (!url) url = location.href
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
}
var PersonCenterCtrl = angular.module('baidu',['getAppvCommunInfoService','scoreExchangeService','userService','communService','getUserScoreInfoService','getSignedInfoService','getUserTaskStatusListService','getUserCommunRelTypeService','getALLTaskStatusListService','jsConfigService','ngTouch']).controller('PersonCenterCtrl',['$scope','getAppvCommunInfo','scoreExchange','User','getSignedInfo','Communs','getUserScoreInfo','getUserTaskStatusList','getUserCommunRelType','getALLTaskStatusList','jsConfig','$q',function($scope,getAppvCommunInfo,scoreExchange,User,getSignedInfo,Communs,getUserScoreInfo,getUserTaskStatusList,getUserCommunRelType,getALLTaskStatusList,jsConfig,$q){
	$scope.tip = {
        show: false,
        message: ''
    };
	$scope.task_length = 0;
	$scope.scoreInfo_length = 0;
    $scope.clickTipFrame = function() {
        $scope.tip.show = false;
        $scope.tip.message = '';
    };

    function triggerAlert(isFrameShow, message, isLineShow) {
        $scope.tip.show = isFrameShow;
        $scope.tip.message = message;
        $scope.tip.btnline = isLineShow;
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

    type = getQueryParams('tab', location.href);
    
    $scope.communs = Communs.query(function(d){
		$scope.communs_length = d.data.length;
	});
    getAppvCommunInfo.query(function(result){
        if (result.error_no !== '0'){
        	location.href = location.href;
        }
        $scope.applyCommuns = result.data;
    });
	$scope.task = getALLTaskStatusList.query({
		page:1,
        rows:20,
	},function(d){
		$scope.task_length = d.data.length;
	});
	$scope.activeTab = 'my';
    $scope.goEdit = function() {
		location.href="/mob/completePersonInfo.do";
    };
	$scope.condition = 'task';
    var get_last_active = function(name) {
		if($scope.condition == 'task'){
            base = 0;
		}
		else if($scope.condition == 'score') {
			base = 1;
        }
		else if($scope.condition == 'commun') {
			base = 2;
        }
		if(name == 'work') {
			now = 0;
        }
		else if(name == 'score') {
			now = 1;
        }
		else if(name == 'commun') {
			now = 2;
        }
		console.log("base"+base);
		console.log("now"+now);
        if(now-base < 0) {
			return "left";
		}
        else {
			return "right";
		}

	};
    var tab_checkout = function(name) {
		$("#score").removeClass("go-left");
        $("#score").removeClass("go-right");
		$("#work").removeClass("go-left");
		$("#work").removeClass("go-right");
        $("#commun").removeClass("go-left");
		$("#commun").removeClass("go-right");
		$("#"+name).addClass("go-"+res);
    };
	$scope.change_tab = function(name) {
		res = get_last_active(name);
        if(name == 'score') {
			$(".part-percent .text-info-message div").addClass("active");
			$(".part-task .text-info-message div").removeClass("active");
            $(".part-commun .text-info-message div").removeClass("active");
			$scope.condition = 'score';
		}
		else if (name == 'commun') {
			$(".part-commun .text-info-message div").addClass("active");
            $(".part-task .text-info-message div").removeClass("active");
			$(".part-percent .text-info-message div").removeClass("active");
			$("#commun").addClass("go-"+res);
			$scope.condition = 'commun';
        }
		else if (name == 'work') {
			$(".part-task .text-info-message div").addClass("active");
            $(".part-commun .text-info-message div").removeClass("active");
			$(".part-percent .text-info-message div").removeClass("active");
			$("#task").addClass("go-"+res);
			$scope.condition = 'task';
        }
		tab_checkout(name);
	};
    
    if (type) {
        if (type === '1') {
            $scope.change_tab('work');
        } else if (type === '2') {
            $scope.change_tab('score');
        } else if(type === '3') {
            $scope.change_tab('commun');
        } else if(type === '4') {
            $scope.isConverting = true;
        }
    }

    $scope.scoreInfo = getUserScoreInfo.query(function(d){
		$scope.scoreInfo_length = d.data.length;
	});
	getUserScoreInfo.query(function(result) {
        if (result.error_no !== '0') {
        	location.href = location.href;
        }
        if (result.data.Current_score) {
            $scope.personScore = result.data.Current_score;
        } else {
            $scope.personScore = 0;
        }
    });
    getSignedInfo.query({
        startDate: '1294890876859',
        endDate:'3000890876859'
    },function(result) {
        if (result.error_no !== '0') {
        	location.href = location.href;
        }
        if (!result.data.continuous) {
            $scope.constantDay = 0;
        } else {
            $scope.constantDay = result.data.continuous;
        }
    });
    $scope.jumpToSpecifyCommun = function(commun_id) {
        location.href = '/mob/communCenter.do?commun_id=' + commun_id; 
    };
	$scope.footerMenu = {
        isopen : false
	};
	$scope.toggleFooterMenuDropDown = function() {
        $scope.footerMenu.isopen = !$scope.footerMenu.isopen;
	};
	$scope.user = User.query(function(d){
		if(d.error_no != 0) {
			location.href = location.href;
		}
		else {
            $scope.user = d;
            console.log(d.data);
		}
	});
	$scope.getTaskInfo = function(id) {
        location.href="/mob/taskInfo.do?taskId="+id;
	};
	$scope.goIndex = function() {
		location.href="/mob/index.do";
	};
	$scope.goMy = function() {
		location.href="/mob/personCenter.do";
	};
	$scope.goCommunDetail = function($event,num) {
		$event.preventDefault();
		location.href="/mob/communCenter.do?commun_id="+num;
	};
	$scope.goCommunField = function($event) {
        $event.preventDefault();
		location.href="/mob/communField.do";
	};
    $scope.hideConvert = function() {
        $scope.isConverting = false;
    };
    $scope.convertScore = function() {
        $scope.isConverting = true; 
    };
	$scope.master = function(cid) {
		getUserCommunRelType.query({"commun_id":cid},function(d){
			if(d.data.reltype == 1) {
				return 1;
			}
			else {
				return 0;
			}
		});
	};
    $scope.confirmConvert = function() {
        scoreExchange.query({
            type: 1,
            score: $scope.personScore
        }, function(result) {
            if (result.data.message) {
                $scope.isConverting = false;
                triggerAlert(true, result.data.message);
            } else if (result.error_no !== '0') {
                location.href = location.href;
            } else if (result.data.status === '10122') {
                $scope.isConverting = false;
                triggerAlert(true, result.data.reason);
                setTimeout(function() {
                    location.href = '/mob/authenticate.do';
                }, 1000);
            } else if (result.data.status === '0'){
                $scope.isConverting = false;
                triggerAlert(true, '小主的积分兑换申请已经提交，耐心等待审批结果吧!（我们将于48小时之内审批您的申请）');
            } else {
                $scope.isConverting = false;
                triggerAlert(true, result.data.reason);
            }
        });
    };
}])
.filter('noHtmltag',function(){
	return function(OriginalString) {
		OriginalString = OriginalString.replace(/(<([^>]+)>)/ig,"");
		if(OriginalString.length > 60) {
			OriginalString = OriginalString.substring(0,60);
			OriginalString += "...";
			return OriginalString;
		}
		return OriginalString;
	}
});
PersonCenterCtrl.$inject = ['$scope','PersonCenterCtrl'];
