/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.controller("loginController",["$scope","$http","user","$timeout","ionicUtilService","$state","$ionicLoading",function($scope,$http,user,$timeout,ionicUtilService,$state,$ionicLoading){
		$scope.user = {
			username:"",
			password:""
		};
		$scope.vil = {
			code:""
		};
		
		$scope.t = new Date().getTime();
		$scope.changeValidCode = function(){
			$scope.t = new Date().getTime();
		}
		$scope.login = function(){
			if($scope.myForm.$invalid){
				ionicUtilService.alert({
					template:"请输入正确的信息"
				});
				return;
			}
			$ionicLoading.show({
			   	 	templateUrl: 'tpls/modal.load.html'
			});
			$http({
				method:"POST",
				url:"api/login/login.jsp",
				data:"user="+JSON.stringify($scope.user)+"&code="+$scope.vil.code
			}).success(function(data){
				if(data.state==200){
					user.setUser(data.data);
					ionicUtilService.alert({
						template:"登录成功"
					}).then(function(res){
						$state.go("enter");
					});
				}
				else if(data.state == 201){
					ionicUtilService.alert({
						template:"账号密码错误"
					});
				}
				else if(data.state == 401){
					ionicUtilService.alert({
						template:"验证码错误"
					});
				}
				$ionicLoading.hide();
			});
		};
	}]);
});
