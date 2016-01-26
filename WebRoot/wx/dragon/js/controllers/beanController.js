/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.controller("beanController",["$scope","$http","user","$timeout","ionicUtilService","$state","$ionicLoading","listService","$stateParams","voteService"
	 ,function($scope,$http,user,$timeout,ionicUtilService,$state,$ionicLoading,listService,$stateParams,voteService){
		$scope.id = $stateParams.id;
		$scope.user = {};
		$scope.image = {};
		if($scope.id){
			$http({
				method:"POST",
				url:"api/bean/bean.jsp",
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
});
