/**
 * 建立angular.module
 */
define(['app'], function (app) {
	app.controller("startController",["$scope","util","$state",function($scope,util,$state){
		$scope.process= {
			data:0
		};
		var images = [];
		for(var i = 0,length=11;i<length;i++){
			images.push("img/icon"+i+".png");
			if(i<5){
				images.push("img/icon"+i+".jpg");
			}
		}
		util.preloadimages(images).done(function(images,process){
			//console.log(process,new Date().getTime());
			$scope.process.data=process;
			$scope.$apply();
			if(process==100){
				setTimeout(function(){
					$state.go("enter");
				},500);
			}
		})
		//setInterval(function(){console.log($scope.process)},1000);
		
	}])
	.factory("util",[function(){
		return {
			preloadimages:function(arr){
				var newimages=[], loadedimages=0
			    var postaction=function(){}  //此处增加了一个postaction函数
			    var arr=(typeof arr!="object")? [arr] : arr
			    var _i = 0;
			   	function paseLoad(){
			   		if(_i==arr.length){
			   			postaction(newimages,Math.ceil(_i/arr.length*100));
			   			return;
			   		}
			   		newimages[_i]=new Image();
			   		newimages[_i].src = arr[_i];
			   		newimages[_i].onload=function(){
			            paseLoad();
			            //setTimeout(paseLoad,200);
			   		};
			   		newimages[_i].onerror=function(){
			            paseLoad();
			        }
			        postaction(newimages,Math.ceil(_i/arr.length*100));
			        _i++;
			   	}
			   	paseLoad();
			    return { //此处返回一个空白对象的done方法
			        done:function(f){
			            postaction=f || postaction;
			        }
			    }
			}
		}
	}])
})


