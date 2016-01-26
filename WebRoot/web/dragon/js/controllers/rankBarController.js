/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.controller("rankBarController",["$scope","$http","user","$timeout","$state","rankService","$stateParams","voteService"
	 ,function($scope,$http,user,$timeout,$state,rankService,$stateParams,voteService){
		$scope.list = [];
		$scope.cnt = 1;
		$scope.option = {
				pageIndex:1,
				name:"",
				zone:$stateParams.zone?$stateParams.zone:""
		}
		
		
		$scope.loadMore = function() {
			rankService.searchByObj($scope.option)
			.success(function(data){
				console.log(data);
				if(data.state==200){
					$scope.list= $scope.list.concat(data.data);
					$scope.cnt = data.count;
					$scope.option.pageIndex ++;
				}
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
			/*$timeout(function(){
				$scope.$broadcast('scroll.infiniteScrollComplete');
				},500);*/
		};

		$scope.$on('$stateChangeSuccess', function() {
			$scope.loadMore();
		});
		
		
	}])
	
});
