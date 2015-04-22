function getQueryParams(name,url) {
    if (!url) url = location.href
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}
var CommunAppealCtrl = angular.module('baidu',['appealCommunityService']).controller('CommunAppealCtrl',['$scope', 'AppealCommunity','$q', function($scope, AppealCommunity, $q) {
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
    $scope.isSuccess = false;
    $scope.isEmpty = false;
    $scope.community_id = getQueryParams("commun_id",location.href);
    $scope.submitAppeal = function() {
        if (!validateReason()) {
            triggerAlert(true, '申诉理由不能为空!');
            return false;
        }
        AppealCommunity.query({
            "community_id": $scope.community_id,
            "reason": $scope.reason
        }, function(result){
            if (result.error_no === '0') {
                if (result.data.status === '0') {
                    $scope.isSuccess = true;
                } else {
                    triggerAlert(true, result.data.reason);
                }
            } else {
                triggerAlert(true, '提交申诉失败!');
				settimeOut(function(){
					window.history.back();
				},2000);
            }
        });
    };
    $scope.hideSuccess = function() {
        $scope.isSuccess = false;
    };
    function validateReason() {
        if (!$scope.reason) {
            $scope.isEmpty = true;
            return false;
        } else {
            $scope.isEmpty = false;
            return true;
        }
    };
}]);
CommunAppealCtrl.$inject = ['$scope', 'CommunAppealCtrl'];
