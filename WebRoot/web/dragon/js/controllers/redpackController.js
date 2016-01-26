/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.controller("redpackController",["$scope","$http","user","$timeout","ionicUtilService","$state","$ionicLoading"
	    ,function($scope,$http,user,$timeout,ionicUtilService,$state,$ionicLoading){
		$scope.isLottery = false;
		$scope.amount = 0;
		
		$scope.init = function(){
			var userinfo = user.getUser();
			if(userinfo){
				$ionicLoading.show({
			   	 	templateUrl: 'tpls/modal.load.html'
				});
				$http({
					method:"POST",
					url:"api/lottery/bean.jsp",
					data:"userid="+userinfo.id+"&openid="+user.getOpenid()
				})
				.success(function(data){
					if(data.state==200){
						$scope.isLottery = true;
						$scope.amount = data.amount;
					}
					else if(data.state==400){
						ionicUtilService.alert({
							template:"今天红包已派送完毕，明天请早!"
						}).then(function(){
							$state.go("enter");
						});
					}
					$ionicLoading.hide();
				});
			}else{
				ionicUtilService.alert({
					template:"请先登录!"
				}).then(function(){
					$state.go("login");
				});
			}
			
		};
		
		$scope.init();
		$scope.lottery = function(){
			var userinfo = user.getUser();
			if(userinfo){
				$ionicLoading.show({
			   	 	templateUrl: 'tpls/modal.load.html'
				});
				$http({
					method:"POST",
					url:"api/lottery/lottery.jsp",
					data:"userid="+userinfo.id+"&username="+userinfo.username+"&openid="+user.getOpenid()+"&phone="+userinfo.phone+"&access_token="+user.getAccessToken()
				})
				.success(function(data){
					//alert(data.state);
					if(data.state==200){
						$scope.isLottery = true;
						$scope.amount = data.amount;
					}
					else if(data.state == 402){
						ionicUtilService.alert({
							template:data.msg
						}).then(function(){
							$state.go("enter");
						});
					}
					else if(data.state == 400){
						ionicUtilService.alert({
							template:"请先完成龙牧体"
						}).then(function(){
							$state.go("bang");
						});
					}
					else if(data.state == 401){
						ionicUtilService.alert({
							template:"该微信号已参与抽奖"
						}).then(function(){
							$state.go("enter");
						});
					}
					else{
						ionicUtilService.alert({
							template:"红包已抽完！"
						}).then(function(){
							$state.go("enter");
						});
					}
					$ionicLoading.hide();
				})
				.error(function(){
					ionicUtilService.alert({
						template:"红包已抽完！"
					}).then(function(){
						$state.go("enter");
					});
					$ionicLoading.hide();
				});
			}else{
				ionicUtilService.alert({
					template:"请先登录!"
				}).then(function(){
					$state.go("login");
				});
			}
		};
	}]);
});
