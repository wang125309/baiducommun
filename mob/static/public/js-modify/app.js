angular.module('userModule',['userService']);
angular.module('indexModule',['userModule']);
angular.module('signModule',[]);
angular.module('partModule',[]);
angular.module('prizeModule',[]);

function getQueryParams(qs) {
	qs = qs.split("+").join(" ");
	var params = {},tokens,re = /[?&]?([^=]+)=([^&]*)/g;
	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])]= decodeURIComponent(tokens[2]);
	}
	return params;
}
app = angular.module('baidu',['ngRoute']).
	config(['$routeProvider',function($routeProvider){
			$routeProvider.when('/mob/index.do',{
				controller:'MainCtrl',
				templateUrl:'/template/index.html'
			}).
            $routeProvider.when('/mob/taskInfo.do',{
                controller:'TaskInfoCtrl',
                templateUrl:'/template/taskInfo.html'
            }).
			otherwise({
				redirectTo:'/'
			});
		}]);
