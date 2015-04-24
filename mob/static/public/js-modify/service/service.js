angular.module('userService',['ngResource']).
	factory('User',['$resource',function($resource){
		return $resource('/api/getUserInfo.do',{},{
				query: {method:'GET', params:{},isArray:false}
		});
	}]);
var completeUserInfo = angular.module('completeUserInfoService', ['ngResource']);
completeUserInfo.factory('CompleteUserInfo', ['$resource', function($resource){
        return $resource('/api/completionUserInfo.do',{},{
            query: {method:'GET', params:{}, isArray:false}
        });
    }]);
var personalAuthentication = angular.module('personalAuthenticationService', ['ngResource']);
personalAuthentication.factory('PersonalAuthentication', ['$resource', function($resource) {
        return $resource('/api/authUserInfo.do',{},{
            query:{method:'GET', params:{}, isArray:false}
        });
    }]);
var appealCommunity = angular.module('appealCommunityService', ['ngResource']);
appealCommunity.factory('AppealCommunity', ['$resource', function($resource) {
        return $resource('/api/appealCommunity.do',{},{
            query:{method:'GET', params:{}, isArray:false}
        });
    }]);
var sign = angular.module('signService',['ngResource']);
sign.factory('Sign',['$resource',function($resource){
		return $resource('/api/isSignIn.do',{},{
			query: {method:'GET', params:{},isArray:false}
		});
	}]);
sign.factory('SignIn',['$resource',function($resource){
		return $resource('/api/signIn.do',{},{
			query: {method:'GET', params:{},isArray:false}
		});
	}]);	
var commun = angular.module('communService',['ngResource']);
commun.factory('CommunsInfo',['$resource',function($resource){
		return $resource('/api/getCommunsInfo.do',{},{
			query: {method:'GET', params:{}, isArray:false}
		});
	}]);
commun.factory('Communs',['$resource',function($resource){
		return $resource('/api/getUserCommun.do',{},{
			query: {method:'GET', params:{}, isArray:false}
		});
	}]);
commun.factory('CommunInfo',['$resource',function($resource){

		return $resource('/api/getCommunInfo.do',{},{
			query: {method:'GET',params:{}, isArray:false}
		});	
	}]);
var task = angular.module('taskService',['ngResource']);
task.factory('Task',['$resource',function($resource){
		return $resource('/api/getTaskList.do',{},{
query: {method:'GET', params:{},isarray:false}
		});
	}]);
task.factory('Like',['$resource',function($resource){
		return $resource('/api/likeTask.do',{},{
			query:{method:'GET',params:{},isarray:false}
		});
	}]);
task.factory('TaskInfo',['$resource',function($resource){
		return $resource('/api/getTaskDetails.do',{},{
			query: {method:'GET', params:{}, isarray:false}
		});
	}]);
var communRanking = angular.module('communRankingService', ['ngResource']);
communRanking.factory('CommunRanking', ['$resource', function($resource){
        return $resource('/api/communRanking.do',{},{
            query: {method:'GET', params:{}, isArray:false}
        });
    }]);
var monthRanking = angular.module('monthRankingService',['ngResource']);
monthRanking.factory('monthRanking',['$resource',function($resource){
		return $resource('/api/monthRanking.do',{},{
			query: {method:'GET',params:{size:10},isArray:false}
		});
	}]);
var scoreRanking = angular.module('scoreRankingService',['ngResource']);
scoreRanking.factory('scoreRanking',['$resource',function($resource){
		return $resource('/api/getTaskReceiveList.do',{},{
			query: {method:'GET',params:{},isArray:false}
		});
	}]);
var taskPrizeList = angular.module('taskPrizeService',['ngResource']);
taskPrizeList.factory('taskPrizeList',['$resource',function($resource){
		return $resource('/api/getTaskPrizeList.do',{},{
			query: {method:'GET',params:{},isArray:false}
		});
	}]);
var receiveTask = angular.module('receiveTaskService',['ngResource']);
receiveTask.factory('ReceiveTask',['$resource',function($resource){
		return $resource('/api/receiveTask.do',{},{
			query: {method:'GET',params:{},isArray:false}
		});
	}]);
var getCommunMemberInfo = angular.module('getCommunMemberInfoService',['ngResource']);
getCommunMemberInfo.factory('getCommunMemberInfo',['$resource',function($resource){
		return $resource('/api/getCommunMemberInfo.do',{},{
			query: {method:'GET',params:{},isArray:false}
		});
	}]);
var getUserCommunRelType = angular.module('getUserCommunRelTypeService',['ngResource']);
getUserCommunRelType.factory('getUserCommunRelType',['$resource',function($resource){
		return $resource('/api/getUserCommunRelType.do',{},{
			query: {method:'GET',params:{},isArray:false}
		});
	}]);
var getCommunityTaskStatusList = angular.module('getCommunityTaskStatusListService',['ngResource']);
getCommunityTaskStatusList.factory('getCommunityTaskStatusList',['$resource',function($resource){
		return $resource('/api/getCommunityTaskStatusList.do',{},{
			query: {method:'GET',params:{},isArray:false}
		});
	}]);
var getAppvUserInfos = angular.module('getAppvUserInfosService',['ngResource']);
getAppvUserInfos.factory('getAppvUserInfos',['$resource',function($resource){
		return $resource('/api/getAppvUserInfos.do',{},{
			query: {method:'GET',params:{},isArray:false}
		});
	}]);
var searchSchool = angular.module('searchSchoolService', ['ngResource']);
searchSchool.factory('searchSchool', ['$resource', function($resource) {
        return $resource('/api/searchSchool.do',{}, {
            query: {method:'GET', params:{},isArrary:false}
        });
    }]);
var existsCommun = angular.module('existsCommunService', ['ngResource']);
existsCommun.factory('existsCommun', ['$resource', function($resource) {
        return $resource('/api/existsCommun.do',{}, {
            query: {method:'GET', params:{}, isArray:false}
        });
    }]);
var getTooltipStr = angular.module('getTooltipStrService', ['ngResource']);
getTooltipStr.factory('getTooltipStr', ['$resource', function($resource) {
        return $resource('/api/getTooltipStr.do',{}, {
            query: {method:'GET', params:{}, isArray:false}
        });
    }]);
var regCommun = angular.module('regCommunService', ['ngResource']);
regCommun.factory('regCommun', ['$resource', function($resource) {
        return $resource('/api/regCommun.do',{},{
            query: {method:'GET',params:{},isArray:false}
        });
    }]);
var getUserScoreInfo = angular.module('getUserScoreInfoService',['ngResource']);
getUserScoreInfo.factory('getUserScoreInfo',['$resource',function($resource){
		return $resource('/api/getUserScoreInfo.do',{},{
			query: {method:'GET',params:{},isArray:false}
		});
	}]);
var joinCommun = angular.module('joinCommunService', ['ngResource']);
joinCommun.factory('joinCommun', ['$resource', function($resource) {
        return $resource('/api/joinCommun.do',{}, {
            query:{method:'GET',params:{},isArray:false}
        });
    }]);
var findCommunList = angular.module('findCommunListService', ['ngResource']);
findCommunList.factory('findCommunList', ['$resource', function($resource) {
        return $resource('/api/findCommunList.do',{},{
            query:{method:'GET',params:{},isArray:false}
        });
    }]);
var finishJump = angular.module('finishJumpService',['ngResource']);
finishJump.factory('finishJump',['$resource',function($resource){
		return $resource('/static/finishJump.do',{},{
			query:{method:'GET',params:{},isArray:false}
		});
	}]);
var getUserTaskStatusList = angular.module('getUserTaskStatusListService',['ngResource']);
getUserTaskStatusList.factory('getUserTaskStatusList',['$resource',function($resource){
		return $resource('/api/getUserTaskStatusList.do',{},{
			query:{method:'GET',params:{},isArray:false}
		});
	}]);
var getSignedInfo = angular.module('getSignedInfoService', ['ngResource']);
getSignedInfo.factory('getSignedInfo',['$resource', function($resource) {
        return $resource('/api/getSignedInfo.do',{},{
            query:{method:'GET',params:{},isArray:false}
        });
    }]);
var scoreExchange = angular.module('scoreExchangeService', ['ngResource']);
scoreExchange.factory('scoreExchange',['$resource', function($resource) {
        return $resource('/api/scoreExchange.do',{},{
            query:{method:'GET',params:{},isArray:false}
        });
    }]);
var quitCommun = angular.module('quitCommunService',['ngResource']);
quitCommun.factory('quitCommun',['$resource',function($resource){
		return $resource('/api/quitCommun.do',{},{
			query:{method:'GET',parmas:{},isArray:false}
		});
	}]);
var acceptAppvInfo= angular.module('acceptAppvInfoService',['ngResource']);
acceptAppvInfo.factory('acceptAppvInfo',['$resource',function($resource){
		return $resource('/api/acceptAppvInfo.do',{},{
			query:{method:'GET',parmas:{},isArray:false}
		});
	}]);
acceptAppvInfo.factory('acceptAllAppvInfo',['$resource', function($resource){
        return $resource('/api/acceptAllAppvInfo.do',{},{
            query:{method:'GET',params:{},isArray:false}
        });
    }]);
var cancelAppvInfo = angular.module('cancelAppvInfoService',['ngResource']);
cancelAppvInfo.factory('cancelAppvInfo',['$resource',function($resource){
        return $resource('/api/cancleAppvInfo.do',{},{
            query:{method:'GET',params:{},isArray:false}
        });
    }]);
var kickMember = angular.module('kickMemberService',['ngResource']);
kickMember.factory('kickMember',['$resource',function($resource){
		return $resource('/api/kickMember.do',{},{
			query:{method:'GET',parmas:{},isArray:false}
		});
	}]);
var getLotteryList = angular.module('getLotteryListService',['ngResource']);
getLotteryList.factory('getLotteryList',['$resource',function($resource){
		return $resource('/static/getLotteryList.do',{},{
			query:{method:'GET',parmas:{},isArray:false}
		});
	}]);
var getAppvCommunInfo = angular.module('getAppvCommunInfoService',['ngResource']);
getAppvCommunInfo.factory('getAppvCommunInfo',['$resource',function($resource) {
        return $resource('/api/getAppvCommunInfo.do',{},{
            query:{method:'GET',params:{},isArray:false}
        });
    }]);

var jsConfig = angular.module('jsConfigService',['ngResource']);
jsConfig.factory('jsConfig',['$resource',function($resource){
		return $resource('/api/getJsConfig.do',{},{
			query:{method:'GET',params:{},isArray:false}
		});
    }]);
var rejectAppvInfo = angular.module('rejectAppvInfoService', ['ngResource']);
rejectAppvInfo.factory('rejectAppvInfo',['$resource',function($resource){
        return $resource('/api/rejectAppvInfo.do',{},{
            query:{method:'GET',params:{},isArrary:false}
        });
    }]);
var delCommun = angular.module('delCommunService',['ngResource']);
delCommun.factory('delCommun',['$resource', function($resource){
        return $resource('/api/delCommun.do',{},{
            query:{method:'GET',params:{},isArray:false}
        });
    }]);
var getSubmitWorks = angular.module('getSubmitWorksService',['ngResource']);
getSubmitWorks.factory('getSubmitWorks',['$resource',function($resource){
		return $resource('/api/getSubmitWorks.do',{},{
			query:{method:'GET',params:{},isArray:false}
		});
	}]);
var getCommunityScoreInfo = angular.module('getCommunityScoreInfoService',['ngResource']);
getCommunityScoreInfo.factory('getCommunityScoreInfo',['$resource',function($resource){
		return $resource('/api/getCommunityScoreInfo.do',{},{
			query:{method:'GET',params:{},isArray:false}
		});
	}]);
var complateCommunityInfo = angular.module('complateCommunityInfoService',['ngResource']);
complateCommunityInfo.factory('complateCommunityInfo',['$resource',function($resource){
		return $resource('/api/completeCommunityInfo.do',{},{
			query:{method:'GET',params:{},isArray:false}
		});
	}]);
var getALLTaskStatusList = angular.module('getALLTaskStatusListService',['ngResource']);
getALLTaskStatusList.factory('getALLTaskStatusList',['$resource',function($resource){
		return $resource('/api/getALLTaskStatusList.do',{},{
			query:{method:'GET',params:{},isArray:false}
		});
	}]);
var notifyCommunMember = angular.module('notifyCommunMemberService',['ngResource']);
notifyCommunMember.factory('notifyCommunMember',['$resource',function($resource){
		return $resource('/api/notifyCommunMember.do',{},{
			query:{method:'GET',params:{},isArray:false}
		});
	}]);






























