/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.controller("bangController",["$scope","$http","user","$timeout","$state",function($scope,$http,user,$timeout,$state){
		$scope.option ={
				val1:"",
				val2:""
		}
		$scope.ispassed = false;
		
		if(user.getUser()){
			$scope.load();
			$http({
				method:"POST",
				url:"/activity/wx/dragon/api/bang/bean.jsp",
				data:"userid="+user.getUser().id
			})
			.success(function(data){
				if(data.state==200){
					$scope.option = data.bean.remark;
					$scope.ispassed = true;
	     		}
				$scope.list = data.list;
			})
			.success(function(){
				$scope.hideLoad();
			});
		}
		
		
		$scope.save = function(){
			if($scope.option.val1==""||$scope.option.val2==""){
				$scope.alert("请输入正确信息");
				return
			}
			var rs = "太BANG了！"+$scope.option.val1+";会做到的，但你首先要" +$scope.option.val2 ;
			 if(user.getUser()){
				 $scope.load();
				$http({
					method:"POST",
					url:"/activity/wx/dragon/api/bang/save.jsp",
					data:"rs="+rs+"&userid="+user.getUser().id+"&username="+user.getUser().username+"&remark="+JSON.stringify($scope.option)
				})
				.success(function(data){
					if(data.state==200){
						$scope.alert("龙牧体保存成功，立即抽奖")
						.result.then(function(){
							//$state.go("redpack");
						})
					}
				})
				.success(function(){
					$scope.hideLoad();
				});
			 }else{
				 $scope.alert("请先登录！");
				
			 }
		};
	}]);
});
