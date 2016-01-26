/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.controller("uploadController",["$scope","$http","user","$timeout","$state","Upload",function($scope,$http,user,$timeout,$state,Upload){
		if(user.getUser())
			var userid = user.getUser().id;
		$scope.isUpload =false;
		$scope.hasImage = false;
		
		$scope.upload = function(file) {
	        Upload.upload({
	            url: 'api/imgUpload.jsp',
	            params:{'id':userid,"path":"dragon"},
	            file:file
	        }).then(function (resp) {
	            console.log(resp);
	            if(resp.data.state){
	            	var imageurl = resp.data.imageurl;
	            	 $http({
				        	method:"POST",
				        	url:"api/upload/save.jsp",
				        	data:"imageurl="+imageurl+"&title="+$scope.image.title+"&userid="+user.getUser().id+"&username="+user.getUser().username+"&zone="+user.getUser().zone
				        })
				        .success(function(data){
				        	if(data.state ==200){
				        		$scope.alert("上传成功")
				        		.result.then(function(){
				        			$state.go("enter");
				        		});
				        	}
				        	$scope.hideLoad();
				        })
	            }else{
	            	$scope.alert(resp.data.msg);
	            	$scope.hideLoad();
	            }
	        }, function (resp) {
	            //console.log('Error status: ' + resp.status);
	        }, function (evt) {
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	        });
	    };
	    
	    $scope.$watch("file",function(n,o){
			if(n!==o&&n){
				console.log(n);
				$scope.hasImage =true;
				//$scope.upload(n);
				/*$modal.open({
					templateUrl:"js/utils/bootstrap/tpls/modalContent.html",
		    		controller:"delModalController",
		    		resolve:{
		    			options:function(){
		    				return{
		    					content:"确认上传图片?"
		    				}
		    			}
		    		}
				}).result.then(function(){
					$scope.upload(n);
				},
				function(){
				})*/
				
			}
		})
		
		if(user.getUser()){
			$scope.load();
			$http({
				method:"post",
				url:"/activity/wx/dragon/api/upload/bean.jsp",
				data:"userid="+userid
			}).success(function(data){
				if(data.state==200){
					$scope.isUpload = true;
					$scope.image = data.bean;
				}
			}).success(function(){
				$scope.hideLoad();
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
		
		
		
		$scope.save = function(){
			if(!user.getUser()){
				$scope.alert("请先登录！");
        		return;
			}
			$scope.load();
			$scope.upload($scope.file);
		};
	}]);
});
