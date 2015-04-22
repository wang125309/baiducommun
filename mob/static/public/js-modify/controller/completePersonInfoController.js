var app = angular.module('baidu', ['userService', 'completeUserInfoService', 'searchSchoolService', 'communService','jsConfigService', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/school',{
        controller: 'SchoolChoiceCtrl',
        templateUrl: '/static/public/tpl/schoolChoice.html'
    })
    .otherwise({
        redirectTo: '/default'
    });
}]);

var CompletePersonInfoCtrl = app.controller('CompletePersonInfoCtrl',['$scope','User', 'CompleteUserInfo', 'Communs','jsConfig', '$q',function($scope,User,CompleteUserInfo,Communs,jsConfig,$q){
    $scope.tip = {
        show: false,
        message: ''
    };

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

    $scope.user = User.query(function(result){
		if(result.error_no !== '0') {
			location.href = location.href;
		}
		else {
            $scope.person.email = result.data.email;
			$scope.person.realname = result.data.realName;
            $scope.person.schoolid = result.data.schoolId;
            $scope.person.school = result.data.school_name;
            $scope.person.phonenum = result.data.phoneNum;
            $scope.person.address = result.data.address;
			if(result.data.gender == '1') {
                $("input[name='genderChoose']")[0].checked = true;
			}
			else if (result.data.gender == '2') {
                $("input[name='genderChoose']")[1].checked = true;
			} else {

            }
        }
	});
    
    $scope.isName = false;
    $scope.isSchool = false;
    $scope.isEmail = false;
    $scope.isPhone = false;
    $scope.isSubmitting = false;

    Communs.query(function(result) {
        if (result.error_no !== '0')  {
            location.href = location.href;
        }
    });

    $scope.person = {};

    $scope.chooseSchool = function() {
        location.href = '/mob/completePersonInfo.do#/school';
    };

    $scope.chooseCommun = function() {
        location.href = '/mob/completePersonInfo.do#/commun';
    };

    $scope.submitInfo = function() {
        $scope.isSubmitting = true;
        if ($scope.hasSubmited) {
            return triggerAlert(true, '您已经提交过了!');
        }
        if ($scope.validatePhone() & $scope.validateSchool() & $scope.validateName() & $scope.validateEmail()) {
            $scope.isSubmitting = false;
            completeinfo = CompleteUserInfo.query({
                realname: $scope.person.realname,
                schoolid: $scope.person.schoolid,
                phonenum: $scope.person.phonenum,
                email: $scope.person.email,
                address: $scope.person.address,
                gender: $("input[name='genderChoose']:checked").length ? $("input[name='genderChoose']:checked").val() : ""
            }, function(data){
                if (data.error_no !== '0') {
                    location.href = location.href;
                } else {
                    triggerAlert(true, '提交成功!');
                    $scope.hasSubmited = true;
                    setTimeout(function() {
                        location.href = '/mob/personCenter.do';
                    }, 1000);
                }
            });
        } else {
            return false;
        };
    };

    $scope.validateName = function() {
        if ($scope.person.realname) {
            return true;
        } else {
            $scope.isName = true;
            if ($scope.isSubmitting) {
                triggerAlert(true, '姓名不能为空!');
            }
            return false;
        }
    };

    $scope.validateSchool = function() {
        if ($scope.person.school) {
            return true;
        } else {
            $scope.isSchool = true;
            if ($scope.isSubmitting) {
                triggerAlert(true, '学校不能为空!');
            }
            return false;
        }
    };
    
    $scope.validatePhone = function() {
        if ($scope.person.phonenum) {
            if (/1[3|4|5|7|8][0-9]{9}$/.test($scope.person.phonenum)) {
                return true;
            } else {
                $scope.isPhone = true;
                if ($scope.isSubmitting) {
                    triggerAlert(true, '手机号格式不正确!');
                }
                return false;
            }
        } else {
            $scope.isPhone = true;
            if ($scope.isSubmitting) {
                triggerAlert(true, '手机号不能为空!');
            }
            return false;
        }
    };
    
    $scope.validateEmail = function() {
        if (!$scope.person.email) {
            return true;
        } else {
            if(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test($scope.person.email)) {
                return true;
            } else {
                $scope.isEmail = true;
                if ($scope.isSubmitting) {
                    triggerAlert(true, '电子邮件格式不正确!');
                }
                return false;
            }
        }
    };
}]);
app.controller('SchoolChoiceCtrl',['$scope', 'searchSchool', function($scope, searchSchool) {
    $scope.changeSchool = function() {
        $scope.schoolList = "";
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
        $scope.$parent.person.schoolid = school_id;
        $scope.$parent.person.school = school_name;
        location.href = "#/default";
    };
}]);
CompletePersonInfoCtrl.$inject = ['$scope','CompletePersonInfoCtrl'];
