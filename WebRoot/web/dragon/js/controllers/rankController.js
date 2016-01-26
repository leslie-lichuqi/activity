/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.controller("rankController",["$scope","$http","user","$timeout","$state","rankService","$stateParams","voteService"
	 ,function($scope,$http,user,$timeout,$state,rankService,$stateParams,voteService){
		$scope.list = [];
		$scope.cnt = 1;
		$scope.option = {
				pageIndex:1,
				name:"",
				zone:$stateParams.zone?$stateParams.zone:"",
				pageSize: 8
		};
		$scope.pageChanged = function(){
			console.log($scope.pagination.bigCurrentPage)
			$scope.option.pageIndex  = $scope.pagination.bigCurrentPage;
			init();
		};
		var init = function(){
			$scope.load();
			rankService.searchByObj($scope.option)
			.success(function(data){
				$scope.hideLoad();
				console.log(data);
				if(data.state==200){
					$scope.list= data.data;
					$scope.cnt = data.count;
					$scope.pagination = {
					  	maxSize:5,
					  	bigTotalItems:data.cnt,
					  	bigCurrentPage:$scope.option.pageIndex
					};
				}
			});
		};
		init();
		
	}])
	.factory("rankService",["$http","user",function($http,user){
		return{
			search:function(pageIndex,name,zone,pageSize){
				var ps = pageSize?pageSize:10;
				return $http({
					method:"POST",
					url:"/activity/wx/dragon/api/rank/list.jsp",
					data:"pageIndex="+pageIndex+"&pageSize="+ps
				});
			},
			searchByObj:function(obj){
				return this.search(obj.pageIndex,obj.name,obj.zone,obj.pageSize);
			}
		}
	}]);
});
