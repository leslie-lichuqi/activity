/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.controller("loginController",["$scope","$http","user","$timeout","$state","$rootScope",function($scope,$http,user,$timeout,$state,$rootScope){
		$scope.basuser = {
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
				$scope.alert("请输入正确的信息");
				return;
			}
			$scope.load();
			$http({
				method:"POST",
				url:"/activity/wx/dragon/api/login/login.jsp",
				data:"user="+JSON.stringify($scope.basuser)+"&code="+$scope.vil.code
			}).success(function(data){
				$scope.hideLoad();
				if(data.state==200){
					user.setUser(data.data);
					$scope.alert("登录成功")
					/*.result.then(function(){
						$state.go("enter");
					});*/
				}
				else if(data.state == 401){
					$scope.alert("验证码错误");
				}
			});
		};
	}]);
});
