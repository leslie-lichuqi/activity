/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app
	.constant({"zone":{"山东省":"华东赛区","江苏省":"华东赛区","安徽省":"华东赛区","浙江省":"华东赛区","上海省":"华东赛区","广东省":"华南赛区","广西壮族自治区":"华南赛区","海南省":"华南赛区","福建省":"华南赛区","江西省":"华南赛区","湖北省":"华中赛区","湖南省":"华中赛区","河南省":"华中赛区","河北省":"华中赛区","北京市":"华中赛区","天津市":"华中赛区","宁夏回族自治区":"西北赛区","新疆维吾尔族自治区":"西北赛区","青海":"西北赛区","陕西省":"西北赛区","山西省":"西北赛区","甘肃省":"西北赛区","四川省":"西南赛区","云南省":"西南赛区","贵州":"西南赛区","西藏":"西南赛区","重庆市":"西南赛区","辽宁省":"东北赛区","吉林省":"东北赛区","黑龙江省":"东北赛区","内蒙古自治区":"东北赛区"}})
	.controller("regController",["$scope","$http","user","$timeout","ionicUtilService","$state","zone","$ionicLoading",function($scope,$http,user,$timeout,ionicUtilService,$state,zone,$ionicLoading){
		$scope.user = {
			isStaff:null,
			username:"",
			password:"",
			repassword:"",
			realname:"",
			phone:"",
			province:"",
			company:"",
			address:"",
			zipcode:"",
			zone:""
		};
		$scope.vil = {
			code:"",
			isRead:false
		};
		
		$scope.$watch("user.province",function(n,o){
			if(n!=o&&n){
				$scope.user.zone = zone[n];
			}
		})
		
		
		var t = null;
		$scope.$watch("user.username",function(n,o){
			if(n!=o&&n){
					if(t)
						$timeout.cancel(t);
					t = $timeout(function(){
					$http({
						method:"POST",
						url:"api/register/checkName.jsp",
						data:"name="+n
					}).success(function(data){
						if(data.state=200){
							$scope.isUser=data.isUser;
						}
					});
				},300);
			}
		});
		var t1;
		$scope.$watch("user.repassword",function(n,o){
			if(n!=o&&n){
				$scope.psCheck = $scope.user.password==$scope.user.repassword;
			}
		});
		$scope.$watch("user.password",function(n,o){
			if(n!=o&&n){
					$scope.psCheck = $scope.user.password==$scope.user.repassword;
			}
		});
		
		
		$scope.t = new Date().getTime();
		$scope.changeValidCode = function(){
			$scope.t = new Date().getTime();
		}
		$scope.save = function(){
			if($scope.myForm.$invalid){
				ionicUtilService.alert({
					template:"请输入正确的信息"
				});
				return;
			}
			if(!$scope.isUser){
				ionicUtilService.alert({
					template:"用户名已被占用"
				});
				return;
			}
			if(!$scope.psCheck){
				ionicUtilService.alert({
					template:"两次输入密码不一样"
				});
				return;
			}
			$ionicLoading.show({
			   	 	templateUrl: 'tpls/modal.load.html'
			});
			$http({
				method:"POST",
				url:"api/register/save.jsp",
				data:"user="+JSON.stringify($scope.user)+"&code="+$scope.vil.code
			}).success(function(data){
				$ionicLoading.hide();
				if(data.state==200){
					user.setUser(data.data);
					ionicUtilService.alert({
						template:"注册成功"
					}).then(function(res){
						$state.go("enter");
					});
				}
				else if(data.state ==201){
					ionicUtilService.alert({
						template:"该号码已被注册"
					});
				}
				else if(data.state == 402){
					ionicUtilService.alert({
						template:data.msg
					});
				}
				else if(data.state == 401){
					ionicUtilService.alert({
						template:"验证码错误"
					});
				}
			});
		};
		$scope.myOptions=[{"ProID":1,"name":"北京市","ProSort":1,"ProRemark":"直辖市"},{"ProID":2,"name":"天津市","ProSort":2,"ProRemark":"直辖市"},{"ProID":3,"name":"河北省","ProSort":5,"ProRemark":"省份"},{"ProID":4,"name":"山西省","ProSort":6,"ProRemark":"省份"},{"ProID":5,"name":"内蒙古自治区","ProSort":32,"ProRemark":"自治区"},{"ProID":6,"name":"辽宁省","ProSort":8,"ProRemark":"省份"},{"ProID":7,"name":"吉林省","ProSort":9,"ProRemark":"省份"},{"ProID":8,"name":"黑龙江省","ProSort":10,"ProRemark":"省份"},{"ProID":10,"name":"江苏省","ProSort":11,"ProRemark":"省份"},{"ProID":11,"name":"浙江省","ProSort":12,"ProRemark":"省份"},{"ProID":12,"name":"安徽省","ProSort":13,"ProRemark":"省份"},{"ProID":13,"name":"福建省","ProSort":14,"ProRemark":"省份"},{"ProID":14,"name":"江西省","ProSort":15,"ProRemark":"省份"},{"ProID":15,"name":"山东省","ProSort":16,"ProRemark":"省份"},{"ProID":16,"name":"河南省","ProSort":17,"ProRemark":"省份"},{"ProID":17,"name":"湖北省","ProSort":18,"ProRemark":"省份"},{"ProID":18,"name":"湖南省","ProSort":19,"ProRemark":"省份"},{"ProID":19,"name":"广东省","ProSort":20,"ProRemark":"省份"},{"ProID":20,"name":"海南省","ProSort":24,"ProRemark":"省份"},{"ProID":21,"name":"广西壮族自治区","ProSort":28,"ProRemark":"自治区"},{"ProID":22,"name":"甘肃省","ProSort":21,"ProRemark":"省份"},{"ProID":23,"name":"陕西省","ProSort":27,"ProRemark":"省份"},{"ProID":24,"name":"新疆维吾尔族自治区","ProSort":31,"ProRemark":"自治区"},{"ProID":25,"name":"青海","ProSort":26,"ProRemark":"省份"},{"ProID":26,"name":"宁夏回族自治区","ProSort":30,"ProRemark":"自治区"},{"ProID":27,"name":"重庆市","ProSort":4,"ProRemark":"直辖市"},{"ProID":28,"name":"四川省","ProSort":22,"ProRemark":"省份"},{"ProID":29,"name":"贵州省","ProSort":23,"ProRemark":"省份"},{"ProID":30,"name":"云南省","ProSort":25,"ProRemark":"省份"},{"ProID":31,"name":"西藏","ProSort":29,"ProRemark":"自治区"}];
		//console.log(typeof $scope.provinces[0].name);
	}]);
});
