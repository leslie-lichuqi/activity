/**
 * 建立angular.module
 */
define(['app',"jweixin"], function (app,wx) {
	app.controller("uploadController",["$scope","$http","user","$timeout","ionicUtilService","$state","$ionicLoading",function($scope,$http,user,$timeout,ionicUtilService,$state,$ionicLoading){
		if(user.getUser())
			var userid = user.getUser().id;
		$scope.isUpload =false;
		
		if(user.getUser()){
			$ionicLoading.show({
		   	 	templateUrl: 'tpls/modal.load.html'
			});
			$http({
				method:"post",
				url:"api/upload/bean.jsp",
				data:"userid="+userid
			}).success(function(data){
				if(data.state==200){
					$scope.isUpload = true;
					$scope.image = data.bean;
				}
			}).success(function(){
				$ionicLoading.hide();
			})
		}else{
		}
		
		$scope.image = {
			title:"",
			imageurl:""
		};
		
		$scope.open=function(url){
			window.location.href = url;
		}
		
		
		$scope.chooseImage = function(){
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					$scope.image.imageurl = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					var div = document.getElementById("imgContainer")
					while(div.hasChildNodes()) //当div下还存在子节点时 循环继续
				    {
				        div.removeChild(div.firstChild);
				    }
				    var img = new Image();
			        img.src = $scope.image.imageurl;
			        img.style.width="50%";
			        //img.className="image";
			        img.addEventListener("click", $scope.chooseImage);
			        div.appendChild(img);
			        $scope.$apply();
				}
			});
		}
		
		$scope.save = function(){
			if(!user.getUser()){
				ionicUtilService.alert({
        			template:"请先登录！"
        		}).then(function(){
        			$state.go("login");
        		})
        		return;
			}
			wx.uploadImage({
			    localId: $scope.image.imageurl, // 需要上传的图片的本地ID，由chooseImage接口获得
			    isShowProgressTips: 1, // 默认为1，显示进度提示
			    success: function (res) {
			        var serverId = res.serverId; // 返回图片的服务器端ID
			        $ionicLoading.show({
				   	 	templateUrl: 'tpls/modal.load.html'
					});
			        $http({
			        	method:"POST",
			        	url:"api/upload/save.jsp",
			        	data:"serverId="+serverId+"&title="+$scope.image.title+"&userid="+user.getUser().id+"&username="+user.getUser().username+"&zone="+user.getUser().zone
			        })
			        .success(function(data){
			        	if(data.state ==200){
			        		ionicUtilService.alert({
			        			template:"上传成功"
			        		}).then(function(){
			        			$state.go("enter");
			        		})
			        	}
			        	$ionicLoading.hide();
			        })
			    }
			});
		};
	}]);
});
