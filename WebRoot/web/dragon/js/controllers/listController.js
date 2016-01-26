/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.controller("listController",["$scope","$http","user","$timeout","$state","listService","$stateParams","voteService"
	 ,function($scope,$http,user,$timeout,$state,listService,$stateParams,voteService){
		$scope.doRefresh = function() {
			$ionicLoading.show({
			   	 	templateUrl: 'tpls/modal.load.html'
			});
			listService.searchByObj($scope.option)
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
			return $scope.option<$scope.cnt;
		};
		$scope.option = {
				pageIndex:1,
				name:"",
				zone:$stateParams.zone?$stateParams.zone:"",
				pageSize: 8
		}
		
		$scope.search = function(){
			$scope.option.pageIndex = 1;
			$scope.load();
			listService.searchByObj($scope.option)
			.success(function(data){
				if(data.state==200){
					$scope.list= data.data;
					$scope.cnt = data.count;
					$scope.option.pageIndex ++;
				}
				$scope.hideLoad();
			});
		}
		$scope.pageChanged = function(){
			console.log($scope.pagination.bigCurrentPage)
			$scope.option.pageIndex  = $scope.pagination.bigCurrentPage;
			init();
		}
		var init = function(){
			$scope.load();
			listService.searchByObj($scope.option)
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
					}
				}
			});
		}
		init();
		
		$scope.$on('$stateChangeSuccess', function() {
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
	.factory("listService",["$http","user",function($http,user){
		return{
			search:function(pageIndex,name,zone,pageSize){
				return $http({
					method:"POST",
					url:"/activity/wx/dragon/api/list/list.jsp",
					data:"pageIndex="+pageIndex+"&name="+name+"&zone="+zone+"&pageSize="+pageSize
				})
			},
			searchByObj:function(obj){
				return this.search(obj.pageIndex,obj.name,obj.zone,obj.pageSize);
			}
		}
	}]);
});
