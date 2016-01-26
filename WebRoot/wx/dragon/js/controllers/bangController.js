/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.controller("bangController",["$scope","$http","user","$timeout","ionicUtilService","$state","$ionicLoading",function($scope,$http,user,$timeout,ionicUtilService,$state,$ionicLoading){
		$scope.option ={
				val1:"",
				val2:""
		}
		$scope.ispassed = false;
		
		if(user.getUser()){
			 $ionicLoading.show({
			   	 	templateUrl: 'tpls/modal.load.html'
			});
			$http({
				method:"POST",
				url:"api/bang/bean.jsp",
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
				$ionicLoading.hide();
			});
		}else{
			 $ionicLoading.show({
			   	 	templateUrl: 'tpls/modal.load.html'
			});
			$http({
				method:"POST",
				url:"api/bang/list.jsp"
			})
			.success(function(data){
				if(data.state==200){
					$scope.list = data.list;
	     		}
			})
			.success(function(){
				$ionicLoading.hide();
			});
		}
		
		
		
		$scope.save = function(){
			if($scope.option.val1==""||$scope.option.val2==""){
				ionicUtilService.alert({
        			template:"请输入正确信息"
        		})
				return
			}
			var rs = "太BANG了！"+$scope.option.val1+";会做到的，但你首先要" +$scope.option.val2 ;
			 if(user.getUser()){
				 $ionicLoading.show({
				   	 	templateUrl: 'tpls/modal.load.html'
				});
				$http({
					method:"POST",
					url:"api/bang/save.jsp",
					data:"rs="+rs+"&userid="+user.getUser().id+"&username="+user.getUser().username+"&remark="+JSON.stringify($scope.option)
				})
				.success(function(data){
					if(data.state==200){
						ionicUtilService.alert({
		        			template:"龙牡体提交成功，前往摇红包抽取红包金额"
		        		}).then(function(){
		        			$state.go("redpack");
		        		})
					}else{
						ionicUtilService.alert({
		        			template:"已提交过龙牧体"
		        		}).then(function(){
		        			$state.go("redpack");
		        		})
					}
				})
				.success(function(){
					$ionicLoading.hide();
				});
			 }else{
				 ionicUtilService.alert({
        			template:"请先登录！"
        		}).then(function(){
        			$state.go("login");
        		})
			 }
		};
	}]);
});
