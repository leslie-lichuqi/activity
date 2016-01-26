/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.controller("rankController",["$scope","$http","user","$timeout","ionicUtilService","$state","$ionicLoading","rankService","$stateParams","voteService"
	 ,function($scope,$http,user,$timeout,ionicUtilService,$state,$ionicLoading,rankService,$stateParams,voteService){
		$scope.doRefresh = function() {
			$ionicLoading.show({
			   	 	templateUrl: 'tpls/modal.load.html'
			});
			$scope.option.pageIndex = 1;
			rankService.searchByObj($scope.option)
			.success(function(data){
				if(data.state==200){
					$scope.list= data.data;
					$scope.cnt = data.count;
					$scope.option.pageIndex ++;
				}
				$scope.$broadcast('scroll.refreshComplete');
				$ionicLoading.hide();
			});
		};
		$scope.list = [];
		$scope.cnt = 1;
		$scope.hasMoreDate = function() {
			return $scope.option.pageIndex<=$scope.cnt;
		};
		$scope.option = {
				pageIndex:1,
				name:"",
				zone:$stateParams.zone
		}
		
		$scope.search = function(){
			$scope.option.pageIndex = 1;
			$ionicLoading.show({
			   	 	templateUrl: 'tpls/modal.load.html'
			});
			rankService.searchByObj($scope.option)
			.success(function(data){
				if(data.state==200){
					$scope.list= data.data;
					$scope.cnt = data.count;
					$scope.option.pageIndex ++;
				}
				$ionicLoading.hide();
			});
		}
		
		var loadState = true;
		$scope.loadMore = function() {
			if(!loadState){
				return;
			}
			loadState =false;
			rankService.searchByObj($scope.option)
			.success(function(data){
				if(data.state==200){
					$scope.list= $scope.list.concat(data.data);
					$scope.cnt = data.count;
					$scope.option.pageIndex ++;
					loadState = true;
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
		
		$scope.vote = function(id,username,bean){
			var rs = voteService.vote(id,username);
			if(rs){
				rs.success(function(data){
					if(data.state==200){
						ionicUtilService.alert({
							template:"投票成功!"
						}).then(function(){
							
						})
						bean.votes = bean.votes+1;
					}
					else if(data.state==400){
						ionicUtilService.alert({
							template:"今天已经参与投票，明天继续!"
						})
					}
					else if(data.state==401){
						ionicUtilService.alert({
							template:"非法token!"
						})
					}
				})
			}
		}
		
	}])
	.factory("rankService",["$http","user",function($http,user){
		return{
			search:function(pageIndex,name,zone){
				return $http({
					method:"POST",
					url:"api/rank/list.jsp",
					data:"pageIndex="+pageIndex
				})
			},
			searchByObj:function(obj){
				return this.search(obj.pageIndex,obj.name,obj.zone)
			}
		}
	}]);
});
