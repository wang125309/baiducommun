var CommunRankCtrl = angular.module('baidu',['communRankingService']).controller('CommunRankCtrl',['$scope', 'CommunRanking','$q', function($scope, CommunRanking, $q) {
    $scope.communRanking = CommunRanking.query({
        size:10 
    }, function(data) {
        if (data.error_no !== '0') {
            location.href = location.href;    
        }
        console.log(data);
    });
    
    $scope.footerMenu = {
            isopen : false
    };
    
    $scope.toggleFooterMenuDropDown = function() {
        $scope.footerMenu.isopen = !$scope.footerMenu.isopen;
    };
   
    $scope.goIndex = function() {
        location.href="/mob/index.do";
    };

    $scope.goMy = function() {
        location.href="/mob/personCenter.do";
    };
}]);
CommunRankCtrl.$inject = ['$scope', 'CommunRankCtrl'];
