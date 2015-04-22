var userListCtrl = angular.module('baidu',['ngTouch','userService','communService','getCommunMemberInfoService','getUserCommunRelTypeService','getAppvUserInfosService','acceptAppvInfoService','kickMemberService','jsConfigService','rejectAppvInfoService']).controller('userListCtrl',['$scope','User','Communs','getCommunMemberInfo','getUserCommunRelType','getAppvUserInfos','acceptAppvInfo','kickMember','jsConfig','rejectAppvInfo','acceptAllAppvInfo','$q','$http',function($scope,User,Communs,getCommunMemberInfo,getUserCommunRelType,getAppvUserInfos,acceptAppvInfo,kickMember,jsConfig,rejectAppvInfo,acceptAllAppvInfo,$q,$http){
    function getQueryParams(name,url) {
		if (!url) url = location.href
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( url );
		return results == null ? null : results[1];
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

	commun_id = getQueryParams("commun_id",location.href);

	$scope.applyList = getAppvUserInfos.query({
		commun_id:commun_id
	}, function(d) {
		if (d.error_no !== '0') {
			location.href = location.href;
		} else {
			$scope.applyments = d.data.length;
			if(d.data.length==0) {
				$scope.show_pass = false;
			}
			else {
				$scope.show_pass = true;
			}
		}
	});
	$scope.pass_all_member = function() {
		$scope.alert = {
			show : false,
			alerttextLeft : "是否接受所有成员申请？",
			alerttextCenter : "",
			alerttextRight : "",
			sure : function() {
				acceptAllAppvInfo.query({
					commun_id:commun_id
				},function(d){
					$scope.applyList = getAppvUserInfos.query({commun_id:commun_id},function(app){});
					$scope.communMembers = getCommunMemberInfo.query({commun_id:commun_id},function(comm){});
					$scope.applyments = 0;
				});
				this.show = false;
				$scope.alert.alertClass = '';
				$scope.tabMember();
			},
			cancel : function() {
				this.show = false;
				$scope.alert.alertClass = '';
			}

		};
		$scope.alert.show = true;
		if($scope.alert.alertClass == 'enter') {
			$scope.alert.alertClass = '';
		}
		else {
			$scope.alert.alertClass="enter";
		}
	};
	$scope.communs = Communs.query(function(d){
		if(d.error_no != 0) {
			location.href = location.href;
		}
		else {
			$scope.communs = d;
		}
	});

	appReceiveDone = [];

	$scope.communMembers = getCommunMemberInfo.query({commun_id:commun_id},function(d){});

	$scope.activeTab = 'commun';

	$scope.applyments = 0; 

	$scope.newMembers = [];

	$scope.receiveMember = function(id) {
		acceptAppvInfo.query({user_id:id,commun_id:commun_id},function(d){
			if(d.error_no==0) {
				if ($scope.applyments > 0) {
					$scope.applyments--;
					}
					$scope.alert = {
						show : false,
						alerttextLeft : "成员申请已接受",
						alerttextCenter : "",
						alerttextRight : "",
						sure : function() {
						this.show = false;
						$scope.alert.alertClass = '';
					},
					cancel : function() {
						this.show = false;
						$scope.alert.alertClass = '';
					}
				};
			}
			$scope.applyList = getAppvUserInfos.query({commun_id:commun_id},function(d){});
			$scope.communMembers = getCommunMemberInfo.query({commun_id:commun_id},function(d){});
			$scope.newMembers.push(id);

		});
	};

	$scope.refuseApply = function(id) {
		rejectAppvInfo.query({
			commun_id: commun_id,
			user_id: id
		}, function(result) {
			if (result.error_no !== '0') {
				location.href = location.href;
			}
			$scope.applyments > 0 ? $scope.applyments-- : null;
			$scope.applyList = getAppvUserInfos.query({commun_id:commun_id},function(d){});
		});
	};

	$scope.isNewMember = function(id) {
		for (var i = 0 ; i < $scope.newMembers.length; i++) {
			if ($scope.newMembers[i] == id) {
				return true;
			}
		}   
		return false;
	};

	$scope.relType = getUserCommunRelType.query({commun_id:commun_id},function(d){
		$scope.relType = d.data.reltype;
		if($scope.relType != 1 && $scope.relType!=3) {
			$scope.new = "grey-word";
		}
	});



	$scope.tabMember = function() {
		$("#part .text-area-wrap .text-pos").addClass("active");
		$("#person .text-area-wrap .text-pos").removeClass("active");
		$("#body").addClass("tab-right");
		$scope.show_members = true;
	};

	$scope.tabNew = function() {
		if($scope.new=='grey-word') {
			return ;
		}
		$("#person .text-area-wrap .text-pos").addClass("active");
		$("#part .text-area-wrap .text-pos").removeClass("active");
		$("#body-new").addClass("tab-left");
		$scope.show_members = false;
	};

	$scope.show_members = true;	
	

	var alertDelete = function(id,name) {
		$scope.alert.alerttextCenter = name;
		$scope.user_id = id;
		$scope.alert.show = true;
		if($scope.alert.alertClass == 'enter') {
			$scope.alert.alertClass = '';
		}
		else {
			$scope.alert.alertClass="enter";
		}
	};

	$scope.delete_user = function(id,name) {
		$scope.alert = {
			show : false,
			alerttextLeft : "您确定要删除成员",
			alerttextCenter : "",
			alerttextRight : "吗？",
			sure : function() {
				this.show = false;
				$scope.alert.alertClass = '';
				kickMember.query({commun_id:commun_id,kick_user_id:$scope.user_id},function(){
					$scope.communMembers = getCommunMemberInfo.query({commun_id:commun_id},function(d){});
				});
			},
			cancel :function() {
				this.show = false;
				$scope.alert.alertClass = '';
			}
		};
		alertDelete(id,name);
	};

	$scope.footerMenu = {
		isopen : false
	};

	$scope.toggleFooterMenuDropDown = function() {
		$scope.footerMenu.isopen = !$scope.footerMenu.isopen;
	};


	n = getQueryParams("new",location.href);
	if(n==1) {
		$scope.user = User.query(function(d){
			if(d.error_no != 0) {
				location.href = location.href;
			}
			$scope.show_members = false;	
			$scope.tabNew();
			$("#person .text-area-wrap .text-pos").addClass("active");
		});



	}


	$scope.goCommunDetail = function($event,num) {
		$event.preventDefault();
		location.href="/mob/communCenter.do?commun_id="+num;
	};

	$scope.goCommunField = function($event) {
		$event.preventDefault();
		location.href="/mob/communField.do";
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
}]);

userListCtrl.$inject = ['$scope','userListCtrl'];
