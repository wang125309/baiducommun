var JoinCommunCtrl = angular.module('baidu',['searchSchoolService', 'findCommunListService','joinCommunService','communService','jsConfigService'])
.controller('JoinCommunCtrl',['$scope','searchSchool', 'findCommunList','Communs','jsConfig','$q',function($scope, searchSchool, findCommunList, Communs,jsConfig, $q) {
    $scope.communName = '';
    
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
    Communs.query(function(result) {
        if (result.error_no !== '0') {
            location.href = location.href;
        }
        $scope.joinedCommuns = result.data;
    });

    $scope.changeSchool = function() {
        $scope.schoolList = "";
        if (!$scope.schoolName) {
            return;
        }
        searchSchool.query({
            school_name: $scope.schoolName.replace(/\'/g,'')
        }, function(result) {
            if (result.error_no !== '0') {
                location.href = location.href;
            } else {
                if (result.data.length === 0) {
                    return;
                }
                $scope.schoolList = result.data;
            }
        });
    };
	$scope.focus_school = function() {
		$(".school-input").focus();
	};
	$scope.focus_commun = function() {
		$(".commun-input").focus();
	};
    $scope.setSchoolName = function(schoolId, schoolName) {
        $scope.schoolName = schoolName;
        $scope.schoolId = schoolId;
        $scope.schoolList = "";
        $scope.changeCommuns();
    };

    $scope.changeCommuns = function() {
        $scope.communList = '';
        //if (!$scope.communName) {
        //    return;
        //}
        //todo
        findCommunList.query({
            start: 0,
            limit: 100,
            cummun_name: $scope.communName,
            school_id: $scope.schoolId
        }, function(result) {
            if (result.error_no !== '0')  {
                location.href = location.href;
            }

            $scope.communList = result.data;
            
            joined = $scope.joinedCommuns;
            communs = $scope.communList;

            for (var i = 0; i < joined.length; i++) {
                for (var j = 0; j < communs.length; j++) {
                    if (joined[i].id === communs[j].id) {
                        communs[j].joined = true;
                        break;
                    } else if (!communs[j].joined) {
                        communs[j].joined = false;
                    }
                }
            }
        });
    };
    
    $scope.joinCommun = function(commun_id) {
        location.href = "/mob/communCenter.do?commun_id=" + commun_id;
    };
}]);
JoinCommunCtrl.$inject = ['$scope', 'JoinCommunCtrl'];
