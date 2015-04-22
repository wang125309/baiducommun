var app = angular.module('baidu', ['searchSchoolService', 'existsCommunService', 'getTooltipStrService', 'regCommunService','jsConfigService', 'ngSanitize', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/school',{
        controller: 'SchoolChoiceCtrl',
        templateUrl: '/static/public/tpl/schoolChoice.html'
    })
    .otherwise({
        redirectTo: '/default'
    });
}]);

var CreateCommunCtrl = app.controller('CreateCommunCtrl',['$scope','searchSchool','getTooltipStr', 'regCommun', '$q','jsConfig', '$sce',function($scope, searchSchool, getTooltipStr, regCommun, $q,jsConfig, $sce) {
    $scope.tip = {
        show: false,
        message: ''
    };

    $scope.clickTipFrame = function() {
        $scope.tip.show = false;
        $scope.tip.message = '';
    };

    function triggerAlert(isFrameShow, message, isLineShow,mine,sure_btn) {
        $scope.tip.show = isFrameShow;
        $scope.tip.message = message;
        $scope.tip.btnline = isLineShow;
		$scope.tip.mine = mine;
		$scope.tip.sure_btn = sure_btn;
		if($scope.tip.mine) {
			$scope.tip.sure = function() {
				if($scope.commun_id!=0) {
					location.href = "/mob/communCenter.do?commun_id="+$scope.commun_id;
				}
				else {
					location.href = "/mob/index.do";
				}
			}
		}
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

    $scope.communName = '';
    $scope.isSchool = false;
    getTooltipStr.query(function(result) {
        if (result.error_no !== '0') {
            location.href = location.href;
        } else {
            $scope.trustHtml = function() {
                return $sce.trustAsHtml(result.data['tooltip']);
            }
        }
    });

    $scope.selectSchool = function() {
        location.href = "/mob/createCommun.do#/school";
    };

    $scope.createCommun = function() {
        if (validateSchool() & validateCommunName()) {
            regCommun.query({
                school_id: $scope.schoolId,
                commun_name: $scope.communName,
				qq:$scope.qq
            }, function(result) {
                if (result.error_no !== '0') {
					console.log(result);
					if(result.data.code == '100032') {
						communs_ids = result.data.message.split("_");
						$scope.commun_id = communs_ids[communs_ids.length-1];
						message = communs_ids[0];	
						triggerAlert(true,message,true,true,'去申诉');
					}
					else {
						triggerAlert(true, result.data.message);
						location.href = location.href;
					}
                } else {
                    triggerAlert(true, '创建成功');
                    setTimeout(function() {
                        location.href = '/mob/communCenter.do?commun_id=' + result.data.id;
                    }, 1000);
                }
            }); 
        }
    };

    function validateSchool() {
        if ($scope.schoolName) {
            return true;
        } else {
            triggerAlert(true, '学校不能为空!');
            return false;
        }
    }

    function validateCommunName() {
        if ($scope.communName) {
            return true;
        } else {
            triggerAlert(true, '社团名称不能为空!');
            return false;
        }
    }
}])
.controller('SchoolChoiceCtrl',['$scope', 'searchSchool', function($scope, searchSchool) {
    $(".input-school").focus();
	$scope.changeSchool = function() {
        $scope.schoolList = '';
        if (!$scope.schoolName) {
            return;
        }
        searchSchool.query({
            school_name: $scope.schoolName.replace(/\'/g,'')
        }, function(result) {
            if (result.error_no !== '0')  {
                location.href = location.href;
            }
            if (result.data.length === 0) {
                return;
            }
            $scope.schoolList = result.data;
        });
    };
    $scope.selectSchool = function(school_id, school_name) {
        $scope.$parent.schoolId = school_id;
        $scope.$parent.schoolName = school_name;
        location.href = "#/default";
    };
}]);
CreateCommunCtrl.$inject = ['$scope', 'CreateCommunCtrl'];
