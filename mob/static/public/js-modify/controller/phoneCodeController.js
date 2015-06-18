var phoneCodeController = angular.module('baidu',['phoneCodeService','jsConfigService']).controller('phoneCodeCtrl',['$scope','authPhoneCode','getPhoneAuthCode','getPhoneAuthStatus','jsConfig','$q', function($scope,authPhoneCode,getPhoneAuthCode,getPhoneAuthStatus,jsConfig,$q) {
    $scope.phoneNumber = '';
    $scope.code = '';
    $scope.time = 60;
    var start = false;
    $scope.canSend = false;
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
    getPhoneAuthStatus.query({},function(d){
        if(d.data.authenticationState == '0') {
            $scope.bindText = '绑定';
        }
        else {
            $scope.phoneNumber = d.data.phoneNum;
            $scope.bindText = '改绑';
        }
    });
    $scope.getCode = function() {
        if(start == false) {
            flag = true;
            phoneNumber = $(".phone").val();
            phoneNumber = phoneNumber + '';
            for(i=0;i<phoneNumber.length;i++) {
                if(phoneNumber[i] > '9' || phoneNumber[i] < '0') {
                    flag = false;     
                }
            }
            if(phoneNumber[0] != '1') {
                flag = false;
            }
            if(phoneNumber.length != 11) {
                flag = false;
            }
            if(flag) {
                start = true;
                getPhoneAuthCode.query({
                    "phoneNum":phoneNumber
                },function(d){
                    if(d.message) {
                        alert(d.message);
                    }
                    if(d.error_no == '0') {
                        $scope.canSend = true;
                        $scope.$apply();
                    }
                });
            }
            else {
                alert("发送验证码失败,请校验您的手机号格式");
            }
        }
    };

    $scope.bind = function() {
        if( $scope.canSend ) {
            authPhoneCode.query({
                "authCode":$(".phone-code").val()
            },function(d){
                if(d.error_no == '0') {
                    alert("绑定成功");
                    wx.closeWindow();
                }
                else {
                    alert(d.message);
                }
            });
        } 
        else {
            alert("请先通过验证码验证");
        }
    };
    setInterval(function(){
        console.log(start);
        if(start) {
            if($scope.time > 0) {
                $scope.time -= 1 ;
                $scope.$apply();
                $(".getCode").css({
                    "background-color":"#e8e8e8"
                });
            }
            else {
                $scope.time = 60;    
                $scope.$apply();
                start = false;
                $(".getCode").css({
                    "background-color":"#06c1ae"
                });
            }
        }
    },1000);
}]);
phoneCodeCtrl = ['$scope', 'phoneCodeCtrl'];
