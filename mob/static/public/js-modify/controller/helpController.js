var helpCtrl = angular.module('baidu',['jsConfigService','ngTouch']).controller('helpCtrl',['$scope','jsConfig','$q',function($scope,jsConfig,$q){
    $scope.p1 = $scope.p2 = $scope.p3 = $scope.p4 = $scope.p5 = $scope.p6 = $scope.p7 = false;

    $scope.showProblem = function(num) {
        if(num == 1) {
            if($scope.p1 == false) {
                $scope.p1 = true;
            }
            else {
                $scope.p1 = false;
            }
        }
        if(num == 2) {
            if($scope.p2 == false) {
                $scope.p2 = true;
            }
            else {
                $scope.p2 = false;
            }
        }
        if(num == 3) {
            if($scope.p3 == false) {
                $scope.p3 = true;
            }
            else {
                $scope.p3 = false;
            }
        }
        if(num == 4) {
            if($scope.p4 == false) {
                $scope.p4 = true;
            }
            else {
                $scope.p4 = false;
            }
        }
        if(num == 5) {
            if($scope.p5 == false) {
                $scope.p5 = true;
            }
            else {
                $scope.p5 = false;
            }
        }
        if(num == 6) {
            if($scope.p6 == false) {
                $scope.p6 = true;
            }
            else {
                $scope.p6 = false;
            }
        }
        if(num == 7) {
            if($scope.p7 == false) {
                $scope.p7 = true;
            }
            else {
                $scope.p7 = false;
            }
        }
    } ;
}]);
helpCtrl.$inject = ['$scope','helpCtrl'];
