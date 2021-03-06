/**
 * 建立angular.module
 */
define(['app'], function (app) {
	function reqGetParam(paramName){
		try {
			var aryParam = window.location.href.split("?")[1].split("&");
			for ( var i = 0; i < aryParam.length; i++) {
				if (paramName.toUpperCase() == aryParam[i].split("=")[0]
						.toUpperCase()) {
					return aryParam[i].split("=")[1];
				}
			}
		} catch (ex) {
			return "";
		}
		return "";
	};
	app
	.constant('paginationConfig', {
	  itemsPerPage: 8,
	  boundaryLinks: false,
	  directionLinks: true,
	  firstText: '首页',
	  previousText: '上一页',
	  nextText: '下一页',
	  lastText: '末页',
	  rotate: true
	})
	.run(["$rootScope","user","modalService","$modal",function($rootScope,user,modalService,$modal){
		$rootScope.shareShow = function(){
			$rootScope.share = true;
		}
		$rootScope.shareHide = function(){
			$rootScope.share = false;
		}
		$rootScope.user = user.getUser();
		$rootScope.logout = function(){
			user.logout();
		}
		$rootScope.alert = function(c){
			return modalService.genModal({
	    		resolve:{
	    			options:function(){
	    				return{
	    					content:c
	    				}
	    			}
	    		}
	    	});
		}
		var loadModal ;
		$rootScope.load = function(){
			if(loadModal){
				loadModal.dismiss();
			}
			loadModal = modalService.genLoadModal();
		}
		$rootScope.hideLoad = function(){
			if(loadModal){
				loadModal.dismiss();
			}
		}
		$rootScope.modal = function(){
			modalService.genModal({
				templateUrl:"tpls/modal.html"
			});
		};
		$rootScope.open = function(url){
			window.location.href = url;
		};
		$rootScope.showBean = function(id){
			$modal.open({
				templateUrl:"tpls/beanModal.html",
				controller:"beanController",
				resolve:{
					"id":function(){
						return id
					}
				}
			});
		}
	}])
	.config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider",function($stateProvider,$urlRouterProvider,$locationProvider,$httpProvider){
		$httpProvider.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
		//$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise("/enter");
		$stateProvider
		.state("enter",{
			url:"/enter",
			views:{
				"main":{
					templateUrl:"tpls/enter.html"
				},
				"rank@enter":{
					templateUrl:"tpls/rankBar.html"
				},
				"code@enter":{
					templateUrl:"tpls/code.html"
				},
				"login@enter":{
					templateUrl:"tpls/login.html"
				},
				"activity@enter":{
					templateUrl:"tpls/activity.html"
				}
			}
		})
		.state("role",{
			url:"/role",
			views:{
				"main":{
					templateUrl:"tpls/role.html"
				},
				"rank@role":{
					templateUrl:"tpls/rankBar.html"
				},
				"code@role":{
					templateUrl:"tpls/code.html"
				}
			}
		})
		.state("notice",{
			url:"/notice",
			views:{
				"main":{
					templateUrl:"tpls/notice.html"
				},
				"rank@notice":{
					templateUrl:"tpls/rankBar.html"
				},
				"code@notice":{
					templateUrl:"tpls/code.html"
				}
			}
		})
		.state("list",{
			url:"/list/:zone",
			views:{
				"main":{
					templateUrl:"tpls/list.html"
				},
				"rank@list":{
					templateUrl:"tpls/rankBar.html"
				},
				"code@list":{
					templateUrl:"tpls/code.html"
				},
				"login@list":{
					templateUrl:"tpls/login.html"
				}
			}
		})
		.state("rank",{
			url:"/rank",
			views:{
				"main":{
					templateUrl:"tpls/rank.html"
				},
				"rank@rank":{
					templateUrl:"tpls/rankBar.html"
				},
				"code@rank":{
					templateUrl:"tpls/code.html"
				},
				"login@rank":{
					templateUrl:"tpls/login.html"
				}
			}
		})
		.state("register",{
			url:"/register",
			views:{
				"main":{
					templateUrl:"tpls/register.html"
				},
				"rank@register":{
					templateUrl:"tpls/rankBar.html"
				},
				"code@register":{
					templateUrl:"tpls/code.html"
				},
				"login@register":{
					templateUrl:"tpls/login.html"
				}
			}
		})
		.state("upload",{
			url:"/upload",
			views:{
				"main":{
					templateUrl:"tpls/upload.html"
				},
				"rank@upload":{
					templateUrl:"tpls/rankBar.html"
				},
				"code@upload":{
					templateUrl:"tpls/code.html"
				},
				"login@upload":{
					templateUrl:"tpls/login.html"
				},
				"activity@upload":{
					templateUrl:"tpls/activity.html"
				}
			}
		})
		.state("bang",{
			url:"/bang",
			views:{
				"main":{
					templateUrl:"tpls/bang.html"
				},
				"rank@bang":{
					templateUrl:"tpls/rankBar.html"
				},
				"code@bang":{
					templateUrl:"tpls/code.html"
				},
				"login@bang":{
					templateUrl:"tpls/login.html"
				},
				"activity@bang":{
					templateUrl:"tpls/activity.html"
				}
			}
		})
		;
	}]);

});
