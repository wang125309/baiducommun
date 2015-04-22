var AuthenticateCtrl = angular.module('baidu',['personalAuthenticationService', 'jsConfigService','ngSanitize']).controller('AuthenticateCtrl',['$scope','PersonalAuthentication','jsConfig','$sce','$q','$http',function($scope,PersonalAuthentication,jsConfig,$sce,$q,$http){
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

    $scope.authentication = {
        numbers: null    
    };
       
    $scope.trustHtml = function(flag) {
        if (flag === 1) {
            html = '<div>点击上传</div>' + 
                '<div><span style="color: #06c1ae;">身份证背面</span>和</div>' +
                '<div><span style="color: #06c1ae;">学生证封皮</span>照片</div>';
        } else if (flag === 2) {
            html = '<div>点击上传</div>' + 
                '<div><span style="color: #06c1ae;">身份证正面</span>和</div>' +
                '<div><span style="color: #06c1ae;">学生证内页</span>照片</div>';;
        } else {
            return false;
        }
        return $sce.trustAsHtml(html);
    };

    isAuthorized = false;
    isUploadingOne = false;
    isUploadingTwo = false;
    $scope.isUploadedOne = false;
    $scope.isUploadedTwo = false;
        
    $scope.uploadImage = function(flag) {
    if (flag === 1) {
        isUploadingOne = true;
            $('.file-one').click();
        } else if (flag === 2) {
            isUploadingTwo = true;
            $('.file-two').click();
        } else {
            return false;
        }
    };

    $scope.submitApplication = function() {
        if (isAuthorized) {
            return triggerAlert(true, '申请已提交');
        }
        if (validateNumbers() && validateUpload()) {
            var formdata = new FormData($('#form')[0]);
            $.ajax({
                type:"POST",
                url:"/api/authUserInfo.do",
                data:formdata,
                processData : false,
                contentType:false,
                success:function(result) {
                    if (result.error_no === '130067') {
                        triggerAlert(true, result.data.reason);
                        $scope.$apply();
                    } else if (result.error_no === '0') {
                        triggerAlert(true, result.data.reason);
                        isAuthorized = true;
                        $scope.$apply();
                        setTimeout(function() {
                            location.href = '/mob/personCenter.do';
                        }, 1000);
                    } else {
                        location.href = location.href;
                    }
                },
                error:function(data) {
                    triggerAlert(true, '未知错误！');
                }
            }); 
        }
    };

    $scope.startUpload = function() {
        var fReader = new FileReader();
        if (isUploadingOne) {
            file_element = $('.file-one');
        } else if (isUploadingTwo) {
            file_element = $('.file-two')
        } else {
            return false;
        }

        if (file_element.value != '') {
            var file = file_element[0];
            fReader.onload = function(event) {
                    uploadImage = event.target.result;
                    if (isUploadingOne) {
                        $('.instance-one').css('background-image', 'url(' + uploadImage + ')');
                        $scope.isUploadedOne = true;
                        isUploadingOne =false;
                    } else if (isUploadingTwo) {
                        $('.instance-two').css('background-image', 'url(' + uploadImage + ')');
                        $scope.isUploadedTwo = true;
                        isUploadingTwo = false;
                    }
                    $scope.$apply();
            };
            fReader.readAsDataURL(file.files[0]);
        }
    };

    $scope.deleteImage = function(flag) {
            if (flag === 1) {
                $('.instance-one').css('background-image', '');
                $scope.isUploadedOne = false;
            } else if (flag === 2) {
                $('.instance-two').css('background-image', '');
                $scope.isUploadedTwo = false;
            } else {
                return false;
            }
    };

    function validateNumbers() {
            if (!$scope.authentication.numbers) {
                triggerAlert(true, '身份证号不能为空!');    
                return false;
            } else if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test($scope.authentication.numbers)) {
                triggerAlert(true, '身份证格式不正确!');
                return false;
            } else if(!$scope.authentication.pay) {
				triggerAlert(true,'请输入您的支付宝账户!');
				return false;
			}
			else
			{
                return true;
            }
    };

    function validateUpload() {
        if ($scope.isUploadedOne & $scope.isUploadedTwo) {
            return true;
        } else {
            triggerAlert(true, '请上传照片!');
            return false;
        }
    };
}]);
AuthenticateCtrl.$inject = ['$scope','AuthenticateCtrl'];
