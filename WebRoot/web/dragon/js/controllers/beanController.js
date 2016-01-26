/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.controller("beanController",["$scope","$http","user","$timeout","$state","listService","$modalInstance","id"
	 ,function($scope,$http,user,$timeout,$state,listService,$modalInstance,id){
		$scope.id = id;
		$scope.user = {};
		$scope.image = {};
		if($scope.id){
			$http({
				method:"POST",
				url:"/activity/wx/dragon/api/bean/bean.jsp",
				data:"id="+$scope.id
			})
			.success(function(data){
				console.log(data);
				if(data.state==200){
					$scope.user = data.user;
					$scope.image = data.image;
				}
			})
		}
		
		$scope.show = function(url){
			window.location.href = url;
		}
		$scope.ok = function () {
		    $modalInstance.close(true);
		  };
		
		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };
		
	}])
});
