var commun = angular.module('communService',['ngResource']);
commun.factory('CommunsInfo',['$resource',function($resource){
	return $resource('/api/getCommunInfo.do',{},{
		query: {method:'GET',params:{},headers: {'Content-Type':'application/x-www-form-urlencoded'}}
	});
}]);
commun.factory('Communs',['$resource',function($resource){
	return $resource('/api/getUserCommun.do',{},{
		query: {method:'GET', params:{}, isArray:false}
	});
}]);
function getQueryParams(name,url) {
	if (!url) url = location.href
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
}
var CommunCenterCtrl = angular.module('baidu',['delCommunService','scoreExchangeService','cancelAppvInfoService','communService','getUserCommunRelTypeService','joinCommunService','getCommunityTaskStatusListService','quitCommunService','getCommunityScoreInfoService','complateCommunityInfoService','complateCommunityInfoService','notifyCommunMemberService','jsConfigService','ngTouch']).controller('CommunCenterCtrl',['$scope','delCommun','scoreExchange','cancelAppvInfo','joinCommun','quitCommun','getUserCommunRelType','Communs','CommunsInfo','getCommunityTaskStatusList','getCommunityScoreInfo','complateCommunityInfo','notifyCommunMember','jsConfig','$q',function($scope,delCommun,scoreExchange,cancelAppvInfo,joinCommun,quitCommun,getUserCommunRelType,Communs,CommunsInfo,getCommunityTaskStatusList,getCommunityScoreInfo,complateCommunityInfo,notifyCommunMember,jsConfig,$q){
	$scope.tip = {
		show: false,
		message: ''
	};

	$scope.clickTipFrame = function() {
		$scope.tip.show = false;
		$scope.tip.message = '';
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

	flag = 0;
	$scope.enableConvert = false;
	$scope.isDelCommun = false;
	$scope.communs = Communs.query();
	commun_id = getQueryParams("commun_id",location.href);

	function triggerAlert(isFrameShow, message, isLineShow,inputQQ) {
		$scope.tip.show = isFrameShow;
		$scope.tip.message = message;
		$scope.tip.btnline = isLineShow;
		if(inputQQ) {
			$scope.inputQQ = true;
			
		}
	};	

	$scope.communsInfo = CommunsInfo.query({commun_id:commun_id},function(d){
		if(d.data.hasNewMember) {
			$scope.hasNewMember = true;
			$scope.goUserList = function() {
				if($scope.hasNewMember) {
					location.href = "/mob/userList.do?commun_id="+commun_id+"&new=1";
				}
				else {
					location.href="/mob/userList.do?commun_id="+commun_id;
				}
			};
		}
		else {
			$scope.newMember = false;
			$scope.goUserList = function() {
				if($scope.newMember) {
					location.href = "/mob/userList.do?commun_id="+commun_id+"&new=1";
				}
				else {
					location.href="/mob/userList.do?commun_id="+commun_id;
				}
			};
		}
	});

	getUserCommunRelType.query({
		commun_id: commun_id
	},function(result){
		if (result.error_no !== '0') {
			location.href = location.href;
		}
		$scope.relType = result.data.reltype;
		if ($scope.relType == 0) {
			$scope.identity = '访客';
		} else if ($scope.relType == 1) {
			$scope.identity = '负责人';
			$scope.enableConvert = true;
		} else  if ($scope.relType == 2) {
			$scope.identity = '成员';
		} else if ($scope.relType == 3) {
			$scope.identity = '管理者';
		} else  if ($scope.relType == 4) {
			$scope.identity = '申请者';
		}
		$scope.goqrcode = function($event) {
			$event.preventDefault();
			location.href="/mob/qrcode.do?commun_id="+commun_id;
		};		
		$scope.task = getCommunityTaskStatusList.query({
			page:1,
			rows:5,
			taskState:2,
			communityId:commun_id,
		},function(d){
			if(d.data.length) {
				if($scope.relType != 0 && $scope.relType != 4) {
					$scope.show_task = true;
				}
			}
			else {
				$scope.show_task = false;
			}
		});
		getUserCommunRelType.query({
			commun_id: commun_id
		},function(da){
			$scope.relType = da.data.reltype;
			console.log($scope.relType);
		});

	});

	$scope.footerMenu = {
		isopen : false
	};
	$scope.toggleFooterMenuDropDown = function() {
		$scope.footerMenu.isopen = !$scope.footerMenu.isopen;
	};
	$scope.getTaskInfo = function(task_id) {
		location.href="/mob/taskInfo.do?taskId="+task_id;
	};
	$scope.goJoin = function() {
		joinCommun.query({
			Commun_id: commun_id
		}, function(result) {
			if (result.message) {
				triggerAlert(true, result.message);
			} else if (result.error_no === '0') {
				$scope.relType = 4;
				triggerAlert(true, '已提交申请，请耐心等待团长审批');
			} else {
				triggerAlert(true, '未知错误');
			}
		});
	};
	$scope.cancelApply = function() {
		cancelAppvInfo.query({
			commun_id: commun_id
		}, function(result) {
			if (result.error_no !== '0') {
				location.href = location.href;
			} else {
				$scope.relType = 0;
				triggerAlert('true','已取消申请');
			}
		});
	};
	$scope.goIndex = function() {
		location.href="/mob/index.do";
	};
	$scope.activeTab = 'commun';
	$scope.quitCommun = function() {
		flag = 1;
		triggerAlert(true, '确认退出该社团吗?', true);
	};
	$scope.hideConvert = function() {
		$scope.isConverting = false;
	};
	$scope.convertScore = function() {
		$scope.isConverting = true;
	};
	$scope.hide_send = function()	 {
		$scope.show_send = false;
	};
	$scope.send_message_show = function() {
		$scope.show_send = true;
		window.scrollTo(0,0);
		$("#sendMessage").addClass("pull-up");
	};
	$scope.sendMessage = function() {
		if($(".send-text").val().length > 0 &&$(".send-text").val().length <140)  {
			notifyCommunMember.query({
				"commun_id":commun_id,
				"description":$(".send-text").val()
			},function(d){
				if(d.data.error_no == 0) {
					triggerAlert(true,'消息已经成功发送');
					$scope.hide_send();
				}
				else {
					triggerAlert(true,d.data.reason);
					$scope.hide_send();
				}
			});
		}
		else {
			triggerAlert(true,'消息发送失败，请注意您的消息长度');
		}
	}
	$scope.confirmConvert = function() {
		if($scope.communsInfo.data.score == 0) {
			$scope.isConverting = false;
			triggerAlert(true,'社团一个积分都没有，赶快接任务去吧！');

		}
		else {
			scoreExchange.query({
				type: 2,
				communityId:commun_id,
				score: $scope.communsInfo.data.score
			}, function(result) {
				if (result.data.message) {
					$scope.isConverting = false;
					triggerAlert(true, result.data.message);
					return;
				} else if (result.error_no !== '0') {
					location.href = location.href;

				} else if (result.data.status === '10122') {
					$scope.isConverting = false;
					triggerAlert(true, result.data.reason);
					setTimeout(function() {
						location.href = '/mob/authenticate.do';
					}, 1000);
				} else if(result.data.status === '0') {
					$scope.isConverting = false;

				} else {
					cover_flag = false;
					CommunsInfo.query({commun_id:commun_id},function(d){
						if(d.data.score==0) {
							cover_flag = true;
							triggerAlert(true,'社团一个积分都没有，赶快接任务去吧！');
						}
						else {
							cover_flag = true;
							triggerAlert(true, '小主的积分兑换申请已经提交，耐心等待审批结果吧!（我们将于24小时之内审批您的申请）');
						}
						$scope.isConverting = false;
					});
					if(cover_flag) {
						triggerAlert(true, result.data.reason);
						$scope.isConverting = false;
					}
				}
			});
	}
	};
	$scope.show_send = false;
	$scope.hideDeleteCommun = function() {
		$scope.isDelCommun = false;
	};
	$scope.delCommun = function() {
		flag = 2;
		triggerAlert(true, '小主真的忍心撇下团团们不管了咩', true);
	};
	$scope.confirmDeleteCommun = function() {
		delCommun.query({
			commun_id: commun_id
		}, function(result) {
			if (result.error_no !== '0') {
				location.href = location.href;
			}
			else {
				location.href = "/mob/communField.do";
			}
		});
	};

	$scope.modifyQQ = function() {
		triggerAlert(true, "", true,true);

	};	
	$scope.tip.sure = function() {
		if (flag == 1) {
			quitCommun.query({
				Commun_id: commun_id
			}, function(result) {
				if (result.message) {
					triggerAlert(true, result.message);  
				} else if (result.error_no === '0') {
					$scope.relType = 0;
					triggerAlert(true, '已成功退出！');
					settimeOut(function(){
						location.href = location.href;
					},3000);
				}
			});
		} else if (flag === 2){
			$scope.tip.show = false;
			$scope.isDelCommun = true;
		} else {
			var qq_num = $(".qq").val();
			flc = false;
			for(i = 0 ;i < qq_num ; i++) {
				if(qq_num[i]<'0'||qq_num[i]>'9') {
					flc = true;
				}
			}
			if(!flc) {
				complateCommunityInfo.query({
					"commun_id":commun_id,
					"description":$(".qq").val()
				},function(d){
					location.href = location.href;
				});
				$scope.inputQQ = false;
				$scope.tip.show=false;
			}
			else {
				triggerAlert(true, "qq号码貌似不是这个样子的吧！", true);
			}
		}
	};
	$scope.tip.cancel = function() {
		$scope.tip.show = false;	
	};
	$scope.goMy = function() {
		location.href="/mob/personCenter.do?commun_id="+commun_id;
	};

	$scope.goCommunDetail = function($event,num) {
		$event.preventDefault();
		location.href="/mob/communCenter.do?commun_id="+num;
		return ;
	};
	$scope.goAppeal = function() {
		location.href = "/mob/communAppeal.do?commun_id="+commun_id;
	};
	$scope.goCommunField = function($event) {
		$event.preventDefault();
		location.href="/mob/communField.do";
	};
	$scope.showScoreHistory = function() {
		$scope.show_empty_bear = true;
		getCommunityScoreInfo.query({
			"commun_id":commun_id
		},function(d){
			$scope.scoreInfo = d;
			if( d.data.His_data.length == 0 ) {
				$scope.show_empty_bear = true;
			}
			else {
				$scope.show_empty_bear = false;
			}
			$scope.scoreHistoryShow = true;
		});

	};
	$scope.back_center = function() {
		$scope.scoreHistoryShow = false;
	};
}])
.filter('noHtmltag',function(){
	return function(OriginalString) {
		if (!OriginalString) {
			return;
		}
		OriginalString = OriginalString.replace(/(<([^>]+)>)/ig,"");
		if(OriginalString.length > 60) {
			OriginalString = OriginalString.substring(0,60);
			OriginalString += "...";
			return OriginalString;
		}
		return OriginalString;
	}
});
CommunCenterCtrl.$inject = ['$scope','CommunCenterCtrl'];
