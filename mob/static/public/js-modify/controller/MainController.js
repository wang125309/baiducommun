var MainCtrl = angular.module('baidu',['userService','communService','taskService','signService','jsConfigService','infinite-scroll','ngTouch']).controller('MainCtrl',['$scope','User','Communs','Task','Sign','SignIn','jsConfig','$q',function($scope,User,Communs,Task,Sign,SignIn,jsConfig,$q){
		$scope.user = User.query();
		$scope.communs = Communs.query();
		$scope.page = 1;
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
		var changeTaskActive = function(active) {
			$("."+active).addClass("active");
		};

		if(localStorage['tasktype']) {
			$scope.tasktype = localStorage['tasktype'];
		}
		else {
			$scope.tasktype = 6;
		}
		if($scope.tasktype == 5) {
			changeTaskActive("person-tab");
		}
		else if($scope.tasktype == 6) {
			changeTaskActive("commun-tab");
		}

		$scope.task = Task.query({page:1,rows:5,type:$scope.tasktype},function(d){
			if(d.data.length==0) {
				$scope.task_empty = true;
			}
			else {
				$scope.task_empty = false;
			}
		});
		$scope.issign = Sign.query();
		$scope.tip = {
			show: false,
			message: ''
		};

		$scope.clickTipFrame = function() {
		    $scope.tip.show = false;
		    $scope.tip.message = '您今天已经签到了哦';
		};
	
		function triggerAlert(isFrameShow, message, isLineShow) {
			$scope.tip.show = isFrameShow;
			$scope.tip.message = message;
			$scope.tip.btnline = isLineShow;
		};
		
		if($scope.user.error_no==2) {
			location.href=location.href;
		}
		else if($scope.user.error_no==1) {
			alert("User query get wrong");
		}
		if($scope.communs.error_no==2) {
			location.href=location.href;
		}
		else if($scope.communs.error_no==1) {
			alert("Task query get wrong");
		}
		if($scope.task.error_no==2) {
			location.href=location.href;
		}
		else if($scope.task.error_no==1) {
			alert("Communs query get wrong");
		}
		if($scope.issign.error_no==2) {
			location.href=location.href;
		}
		else if($scope.issign.error_no==1) {
			alert("Communs query get wrong");
		}
		$scope.signed = false;
		$scope.sign = function(){
			signinstat = $scope.issign.data.signinstat;	
			if(!signinstat) {
				SignIn.query(function(d){
					triggerAlert(true, "小主今天签到成功了~获得 "+d.data.score+" 积分哦~");
				});
				$scope.signed=true;
			}
		};
		$scope.activeTab = 'task';

		$scope.changePerson = function($event) {
			if ($event.stopPropagation) $event.stopPropagation();
			if ($event.preventDefault) $event.preventDefault();
			$("#person .text-pos").addClass("active");
			$("#part .text-pos").removeClass("active");
			if($scope.toggleCommun) {
				$scope.toggleCommun = false;
			}
			$scope.tasktype = 5;
			$scope.task = Task.query({page:$scope.page,rows:5,type:$scope.tasktype},function(d){
				$scope.task = d;
				$scope.more = 'start';
				$scope.page = 1;
				if(d.data.length == 0) {
					$scope.task_empty = true;
				}
				else {
					$scope.task_empty = false;
				}
			});
		};
		$scope.changeCommun = function($event) {
			if ($event.stopPropagation) $event.stopPropagation();
			if ($event.preventDefault) $event.preventDefault();
			$("#person .text-pos").removeClass("active");
			$("#part .text-pos").addClass("active");
			$scope.tasktype = 6;	
			$scope.task = Task.query({page:$scope.page,rows:5,type:$scope.tasktype},function(d){
				$scope.task = d;
				$scope.more = 'start';
				$scope.page = 1;
				if(d.data.length == 0) {
					$scope.task_empty = true;
				}
				else {
					$scope.task_empty = false;
				}
			});
		};
		$scope.status = {
			isopen: false
		};
		$scope.toggleDropdown = function($event) {
			$scope.status.isopen = !$scope.status.isopen;
			$("#pull-down-filter-menu").addClass("pull-down-animation");
		};
		$scope.order_by = "None";
		$scope.order_by_time = function() {
			$scope.order_by = "-pushDate";
			$scope.status.isopen = !$scope.status.isopen;
		};
		$scope.order_by_hot = function() {
			$scope.order_by = "-likeNum";
			$scope.status.isopen = !$scope.status.isopen;
		};
		
		$scope.footerMenu = {
			isopen : false
		};
		$scope.toggleFooterMenuDropDown = function() {
			$scope.footerMenu.isopen = !$scope.footerMenu.isopen;
			$(".plat-form-menu").addClass("pull-down-animation");
		};
		$scope.loadMore = function() {
			show_more();		
		};
		$scope.toggleClose = function() {
			if($scope.toggleCommun)	 {
				$scope.toggleCommun = false;
			}
			else if($scope.togglePerson) {
				$scope.togglePerson = false;
			}
		};
		show_more = function() {
			if($scope.more == 'stop') {
				return ;
			}
			Task.query({page:$scope.page+1,rows:5,type:$scope.tasktype},function(d){
				if (d.data.length == 0) {
					$scope.more = 'stop';
					return ;
				}
				else {
					$scope.page += 1;
					for(var i = 0 ; i < d.data.length ; i++) {
						$scope.task.data.push(d.data[i]);	
					}
				}
			});
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
		$scope.goCommunDetail = function($event,num) {
			$event.preventDefault();
			location.href="/mob/communCenter.do?commun_id="+num;
		};
		$scope.goCommunField = function($event) {
			$event.preventDefault();
			location.href="/mob/communField.do";
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
MainCtrl.$inject = ['$scope','MainCtrl'];
