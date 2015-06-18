var dailyStarCtrl = angular.module('baidu',['jsConfigService','dailyStarService','ngTouch','ngSanitize']).controller('dailyStarCtrl',['$scope','selectWinnerStatus','$sce','jsConfig','$q',function($scope,selectWinnerStatus,$sce,jsConfig,$q){
    selectWinnerStatus.query({},function(d){
        $scope.luckDay = d;
        if(d.todayWinList.length == 0) {
            $scope.no_reward = false;
        }
        else {
            $scope.no_reward = true;
        }
        console.log(d);
        $scope.trustHtml = function() {
            return $sce.trustAsHtml(d.luckdaydescription);
        };
    });
}]);
dailyStarCtrl.$inject = ['$scope','dailyStarCtrl'];
