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
		$scope.data={
			t:new Date().getTime(),
			change:function(){
				$scope.data.t = new Date().getTime();
			}
		}
		$scope.init();
		var lotteryState = false;
		$scope.lottery = function(){
			if(lotteryState){
				return;
			}
			lotteryState = true;
			var userinfo = user.getUser();
			if(userinfo){
				var popup = ionicUtilService.show({
					template:"<img width='50%' ng-click='data.change()' src='/activity/servlet/ImgValidHandler?t={{data.t}}'/><input style='margin:10px 0' type='text' ng-model='data.valid'/>",
					title: '输入验证码即可抽奖',
					scope:$scope,
					buttons: [
			          { 
			        	  // Array[Object] (optional). Buttons to place in the popup footer.
						    text: '取消',
						    type: 'button-default',
						    onTap: function(e) {
						      // e.preventDefault() will stop the popup from closing when tapped.
						    	e.preventDefault();
					    	}
						}, 
						{
						    text: '确定',
						    type: 'btn-type-default',
						    onTap: function(e) {
						      if($scope.data.valid){
						    	  return $scope.data.valid;
						      }else{
						    	  return false;
						      }
						    }
						}]
				});
				popup.then(function(res){
					if(res){
						$ionicLoading.show({
					   	 	templateUrl: 'tpls/modal.load.html'
						});
						$http({
							method:"POST",
							url:"api/lottery/raffle.jsp",
							data:"code="+$scope.data.valid+"&userid="+userinfo.id+"&username="+userinfo.username+"&openid="+user.getOpenid()+"&phone="+userinfo.phone+"&access_token="+user.getAccessToken()
						})
						.success(function(data){
							lotteryState = false;
							//alert(data.state);
							if(data.state==200){
								ionicUtilService.alert({
									template:"工作人员会在两个工作日内完成审核，审核通过将会把红包发送至您的微信账户。请留意21世纪药店给您发的微信红包，记得点开领取哦！"
								})
								$scope.isLottery = true;
								$scope.amount = data.amount;
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
							else if(data.state == 403){
								ionicUtilService.alert({
									template:"验证码填写错误"
								}).then(function(){
									//$state.go("enter");
								});
							}
							else{
								ionicUtilService.alert({
									template:"今天红包已派送完毕，明天请早!"
								}).then(function(){
									$state.go("enter");
								});
							}
							$ionicLoading.hide();
						})
						.error(function(data){
							ionicUtilService.alert({
								template:"今天红包已派送完毕，明天请早!"
							}).then(function(){
									$state.go("enter");
							});
						});
					}else{
						ionicUtilService.alert({
							template:"请输入验证码"
						});
						lotteryState = false;
					}
					
				})
			}else{
				ionicUtilService.alert({
					template:"请先登录!"
				}).then(function(){
					$state.go("login");
				});
				lotteryState = false;
			}
		};
	}]);
});
