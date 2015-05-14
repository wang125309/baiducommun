function getQueryParams(name,url) {
	if (!url) url = location.href
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
}
var TaskInfoCtrl = angular.module('baidu',['userService','taskService','receiveTaskService','monthRankingService','scoreRankingService','taskPrizeService','communService','getUserCommunRelTypeService','getUserCommunRelTypeService','jsConfigService','getSubmitWorksService','ngAnimate','ngSanitize']).controller('TaskInfoCtrl',['$scope','TaskInfo','ReceiveTask','monthRanking','scoreRanking','taskPrizeList','getUserCommunRelType','Communs','User','jsConfig','getSubmitWorks','Like','$q','$location','$sce','$http',function($scope,TaskInfo,receiveTask,monthRanking,scoreRanking,taskPrizeList,getUserCommunRelType,Communs,User,jsConfig,getSubmitWorks,Like,$q,$location,$sce,$http){
	id = getQueryParams("taskId",location.href);
	cid = getQueryParams("cid",location.href);

	$scope.taskId = id;
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
	$scope.backTask = function() {
		$scope.submitView = false;
	};

	$scope.show_task_condition = false;
	if(localStorage[id+"num"] == 1) {
		$scope.like = 1;
	}
	else {
		$scope.like = 0;
	}
    $scope.wxForward = function() {
        location.href = '/mob/sharePage.do?taskId='+id+'&taskStatusId='+$scope.taskStatusId; 
    }
	$scope.apply_count = 1;
	$scope.prize_count = 1;
	$scope.apply_show_more = function() {
		$scope.apply_count += 1;
		if($scope.apply_more_show) {
			scoreRanking.query({taskId:id,page:$scope.apply_count,rows:10},function(d){
				if(d.data.list.length == 0) {
					$scope.apply_more_show = false;
				}
				else {
					for(i in d.data.list) {
						$scope.scoreRanking.data.list.push(d.data.list[i]);
					}
					console.log($scope.scoreRanking);			
				}	
			});
		}
	};
	$scope.prize_show_more = function() {
		$scope.prize_count += 1;
		if($scope.prize_more_show) {
			taskPrizeList.query({taskId:id,page:$scope.prize_count,rows:10},function(d){
				if(d.data.list.length == 0) {
					$scope.prize_more_show = false;
				}
				else {
					for(i in d.data.list) {
						$scope.taskPrizeList.data.list.push(d.data.list[i]);
					}
					console.log($scope.taskPrizeList);			
				}	
			});
		}
	};
	var update_task = function() {
		$scope.task = TaskInfo.query({"taskId":id},function(data){
			Like.query({taskId:id,type:2},function(d){
				$scope.likeNum = d.data.likeNum;
			});
            
			$scope.communs = Communs.query(function(cd){
				$scope.communs = cd;
				scoreRanking.query({taskId:id,page:1,rows:10},function(d){
					scoreRanking.query({taskId:id,page:2,rows:10},function(d){
						if(d.data.list.length == 0) {
							$scope.apply_more_show = false;
						}
						else {
							$scope.apply_more_show = true;
						}
					});
					$scope.scoreRanking = d;
					if(d.data.list&&d.data.list.length>0) {
						$scope.show_scoreRanking = true;
					}
					else {
						$scope.show_scoreRanking = false;
					}
				});
				taskPrizeList.query({taskId:id,page:1,rows:10},function(d){
					$scope.taskPrizeList = d;
					taskPrizeList.query({taskId:id,page:2,rows:10},function(d){
						if(d.data.list.length == 0) {
							$scope.prize_more_show = false;
						}
						else {
							$scope.prize_more_show = true;
						}
					});
					if(d.data.list&&d.data.list.length>0) {
						$scope.show_task_prize_list = true;
					}
					else {
						$scope.show_task_prize_list = false;
					}
				});
				$scope.task.data.endDate = "截止日期："+$scope.task.data.endDate;
				data = data.data;
				if(data.type == 3 || data.type == 4) {
					localStorage['tasktype'] = 6;
					$scope.commun_count = $scope.communs.data.length;
					if($scope.communs.data.length>1) {
						$scope.tab = [];
						for(i=0;i<$scope.communs.data.length;i++) {
							$scope.tab.push({"num":i,"cid":cd.data[i].id,"name":cd.data[i].name,"rel":cd.data[i].relType});
						}
						console.log($scope.tab);
						if(cid) {
							if($scope.show_task_condition == false) {
								for (i=0;i<$scope.tab.length;i++) {
									console.log($scope.tab[i]);
									if(cid == $scope.tab[i].cid) {
										$scope.communNum = i;
										$scope.active = i;
										localStorage['commun'] = i;
										$scope.show_task_condition = true;
									}
								}
							}
						}
					}
					if($scope.communs.data.length>1) {
						if(!localStorage['commun']) {
							$scope.communNum = 0;
						}
						else {
							$scope.communNum = localStorage['commun'];
						}			
					}
					else {
						$scope.communNum = 0;
					}
					if($scope.communs.data.length < 2) {
						$scope.communNum = 0;
					}
					$scope.taskType = "team";
					$scope.taskMessage = "任务信息";
					$scope.trustHtml = function() {
						return $sce.trustAsHtml(data.description);
					};

					if($scope.communNum>=0) {
						i = $scope.communNum;
						localStorage['commun'] = i;
						$scope.reltype = getUserCommunRelType.query({commun_id:data.taskStatusData[i].entityId});
						$scope.active = i; 	
						if(data.taskStatusData.length==0&&(data.type==1||data.type==2)) {
							$scope.entityid = $scope.communs.data[i].id;
							$scope.taskState = '未领取';
							$scope.taskStatusId = data.taskStatusData[i].taskStatusId;
						}
						else if(data.taskStatusData.length==0&&(data.type==3||data.type==4)) {
							$scope.taskState = '未领取';
						}
						else {
							$scope.entityId = data.taskStatusData[i].entityId;
							$scope.taskState = '未领取';	
							if(data.taskStatusData[i].taskState == 0) {
								$scope.taskState = '未领取';	
							}
							else if (data.taskStatusData[i].taskState == 1) {
								$scope.taskState = '已领取';
							}
							else if (data.taskStatusData[i].taskState == 2) {
								$scope.taskState = '已通过';
								$scope.taskStatusId = data.taskStatusData[i].taskStatusId;
							}
							else if (data.taskStatusData[i].taskState == 3) {
								$scope.taskState = '已驳回';
							}
							else if (data.taskStatusData[i].taskState == 4) {
								$scope.taskState = '已评奖';
							}
						}
                        
						getSubmitWorks.query({
							taskStatusId:$scope.taskStatusId
						},function(d){
							$scope.submitWorks = d;
							for(i=0;i<d.data.length;i++) {
								$scope.previews.push({"pos":i,"image":"background:url("+d.data[i].resourceUrl+")","type":"other"});
							}
						});
					}
				}
                $scope.isWxTask = data.isWxForward;
				if(data.type==1||data.type==2) {
					$scope.taskType = "person";
					localStorage['tasktype'] = 5;
					$scope.taskMessage = "任务信息";
					$scope.taskState = '未领取';
					if(data.taskStatusData.length>0) {
						$scope.entityId = data.taskStatusData[0].entityId;
						if(data.taskStatusData[0].taskState == 0) {
							$scope.taskState = '未领取';	
						}
						else if (data.taskStatusData[0].taskState == 1) {
							$scope.taskState = '已领取';
						}	
						else if (data.taskStatusData[0].taskState == 2) {
							$scope.taskState = '已通过';
							$scope.taskStatusId = data.taskStatusData[0].taskStatusId;
						}
						else if (data.taskStatusData[0].taskState == 3) {
							$scope.taskState = '已驳回';
						}
						else if (data.taskStatusData[0].taskState == 4) {
							$scope.taskState = '已评奖';
						}
						getSubmitWorks.query({
							taskStatusId:$scope.taskStatusId
						},function(d){
							$scope.submitWorks = d;
							for(i=0;i<d.data.length;i++) {
								$scope.previews.push({"pos":i,"image":"background:url("+d.data[i].resourceUrl+")","type":"other"});
							}
						});
					}
					$scope.trustHtml = function() {
						return $sce.trustAsHtml(data.description);
					};
				}
			});
    });

}
update_task();
$scope.show_other = function(i) {
	$scope.communNum = i;
	$scope.active = i;
	localStorage['commun'] = i;
	if(cid) {
		$scope.show_task_condition = true;
	}
	update_task();
};
$scope.add_fans = function() {
	if(localStorage[id+"num"]>0) {
		Like.query({taskId:id,type:1},function(d){
			$scope.likeNum = d.data.likeNum;
			localStorage[id+"num"] = 0;
			$scope.like = false;
		});
	}
	else {
		Like.query({taskId:id,type:0},function(d){
			$scope.likeNum = d.data.likeNum;
			localStorage[id+"num"] = 1;
			$scope.like = true;
		});
	}
};
var alertTask = function(data,str) {
	if(str) {
		if(str == "goCreate") {
			setTimeout(function(){
				location.href = "/mob/createCommun.do";
			},1000);
		}
	}
	$scope.taskMessage = data;
	$scope.alertClass = 'enter';
	$scope.alert = true;
	$scope.$apply();
};
$scope.alert = false;
$scope.alertClass="";
var alreadyGet = false;

$scope.getTask = function() {
	if(alreadyGet == false) {
		alreadyGet = true;
		console.log($scope.reltype);
		if(($scope.task.data.type==1||$scope.task.data.type==2)||(($scope.reltype.data.reltype==1||$scope.reltype.data.reltype==3)&&(($scope.task.data.type==3||$scope.task.data.type==4)&&$scope.taskState=="未领取"))) {
			User.query(function(user){
				if(!user.data.realName&&!user.data.schoolId&&!user.data.realName&&!user.data.realName.length&&!user.data.phoneNum&&!user.data.phoneNum.length) {
					$scope.need_complate = 1;
					alertTask("您需要先完善个人信息");
				}
				else {
					receiveTask.query({"taskId":id},function(data){
						console.log(data);
						if(data.error_no == 0) {
							if(data.data.status == 1) {
								alertTask(data.data.reason);
							}
							else {
								if(data.data.reason) {
									alertTask(data.data.reason);
								}	
								else {
									alertTask("任务已经领取成功了哦~");
									$scope.taskState = '已领取';
								}
							}
						}
						else {
							location.href=location.href;
						}
					});
				}
			});
		}
		else if(($scope.task.data.type==3||$scope.task.data.type==4)&&($scope.taskState=='未领取')&&($scope.communs.data.length==0)) {
			alertTask("您还没有社团，您可以自己创建一个社团哦~","goCreate");
		}
		else {
			alertTask("对不起哦，您不是社团领袖，不能领取任务~");
		}
	}
	else {
		alreadyGet = true;
	}
};
$scope.iknow = function() {
	already_submit = false;
	alreadyGet = false;
	if($scope.need_complate==1) {
		location.href="/mob/completePersonInfo.do";
		$scope.need_complate==0;
	}
	$scope.alert = false;
	$scope.alertClass = '';
};
$scope.footerMenu = {
	isopen : false
};
$scope.toggleFooterMenuDropDown = function() {
	$scope.footerMenu.isopen = !$scope.footerMenu.isopen;
};
$scope.fileAdd = function() {
	var num = $scope.image_files[$scope.image_files.length-1];
	$("#add-image-"+num).click();
};
$scope.upload_css="background:#dcdcdc";
$scope.previews = [];
$scope.image_files = [1];

$scope.submitTask = function() {
	$scope.submitView = true;
};
$scope.goIndex = function() {
	location.href="/mob/index.do";
};
$scope.close_img = function(i) {
	if(!$scope.previews.splice(i,1)) {
		$scope.previews.pop();
	}
};


$scope.getQrcode = function() {
	location.href="/mob/qrcode.do?taskId="+$scope.task.data.id+"&entityId="+$scope.entityId;	
};
$scope.submitView = false;

if(localStorage[id]==1) {
	$scope.submitText = "继续提交";
	$scope.submitTextOnline = "继续提交";
}
else {
	$scope.submitText = "确认提交";
	$scope.submitTextOnline = "提交任务";
}
var already_submit = false;
$scope.form_submit = function() {
	if(already_submit == false) {
		if($scope.image_files.length == 1) {
			alertTask("至少传些神马图片吧");
		}
		else {
			var formdata = new FormData($('#form')[0]);
			$.ajax({
				type:"POST",
				url:"/api/taskSubmitWorks.do",
				data:formdata,
				processData : false, 
				contentType:false,
				success:function(data) {
					alertTask("任务提交成功");
					localStorage[id] = 1;
					$scope.submitText = "继续提交";
					already_submit = true;
					$scope.submitView = false;
				},
				error:function(data) {
					already_submit = true;
					alertTask("任务提交失败");
				}
			});
		}
	}
};
}])
.directive('fileUpload',function(){
	return {
		link : function(scope, element, attr) {
			element.on('change',function(){
				var fReader = new FileReader();
				console.log(scope.image_files[scope.image_files.length-1]);
				file_element = document.getElementById("add-image-"+scope.image_files[scope.image_files.length-1]);
				fReader.readAsDataURL(file_element.files[0]);
				fReader.onloadend = function(event){
					upload_image = event.target.result;
					l = scope.previews.length;
					pos = 0;
					scope.previews.push({"pos":pos,"image":"background:url("+upload_image+")","type":"upload"});
					scope.image_files.push(scope.image_files[scope.image_files.length-1]+1);
					console.log(scope.image_files);
					scope.$apply();
				}
			});
		}
	};
});
TaskInfoCtrl.$inject = ['$scope','TaskInfoCtrl'];
