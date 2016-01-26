/**
 * 建立angular.module
 */
define(['app'], function (app) {
  	//var app = angular.module("app",["ionic","ionicUtil","ui.router","wxShare","app.start","app.main","app.bean","app.config","app.service.vote","app.rank","app.service.authorization"]);
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
	.run(["wxShareService","$rootScope","user",function(wxShareService,$rootScope,user){
		wxShareService.getConfig();
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
		try{
			var code =JSON.parse(decodeURI(reqGetParam("code")));
			user.setCode(code);
		}catch(e){
			
		}
	}])
	.config(["$stateProvider","$urlRouterProvider","$locationProvider","wxShareServiceProvider","ionicUtilServiceProvider","$httpProvider",function($stateProvider,$urlRouterProvider,$locationProvider,wxShareServiceProvider,ionicUtilServiceProvider,$httpProvider){
		$httpProvider.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
		wxShareServiceProvider.setOptions({
			debug:false,
			title: "龙牡杯全国药店POP大赛",
			desc: '发挥你的灵感创作龙牡体和POP吧，丰厚奖励等你来！',
			link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfbf67d72f8c723ec&redirect_uri=http%3A%2F%2F21cn.menet.com.cn%3A8080%2Factivity%2Fwx%2Fauth%2Fauthorize.jsp%3Fredirect_uri%3Dhttp%3A%2F%2F21cn.menet.com.cn%3A8080%2Factivity%2Fwx%2Fdragon%2Findex.html&response_type=code&scope=snsapi_base&state=#wechat_redirect',
			imgUrl: 'http://21cn.menet.com.cn:8080/activity/wx/dragon/img/icon7.jpg'
		});
		ionicUtilServiceProvider.setAlertOptions({
				title: '提示信息', 
				okText:"确定",
				okType:"btn-type-default"
		});
		ionicUtilServiceProvider.setConfirmOptions({
				title: '提示信息',
				okText:"确定",
				okType:"btn-type-default",
				cancelText:"取消"
		});
		ionicUtilServiceProvider.setLoadOptions({
				//template:'',{string=} The html content of the indicator.
				templateUrl:"tpls/load.html",//{string=}The url of an html template to load as the content of the indicator.
				scope :null,//{object=} The scope to be a child of. Default: creates a child of $rootScope.
				noBackdrop:true,//{boolean=} Whether to hide the backdrop. By default it will be shown.
				hideOnStateChange:false,//{boolean=} Whether to hide the loading spinner when navigating to a new state. Default false.
				delay:0,//{number=} How many milliseconds to delay showing the indicator. By default there is no delay
				duration:null//{number=} How many milliseconds to wait until automatically hiding the indicator. By default, the indicator will be shown until .hide() is called.
		});
		ionicUtilServiceProvider.setShowOptions({
				title: '提示信息',
				buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.
				    text: '取消',
				    type: 'button-default',
				    onTap: function(e) {
				      // e.preventDefault() will stop the popup from closing when tapped.
				      e.preventDefault();
				    }
					}, {
				    text: '确定',
				    type: 'btn-type-default',
				    onTap: function(e) {
				      return scope.data.response;
				    }
				}]
		});
		//$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise("/start");
		$stateProvider
		.state("start",{
			url:"/start",
			views:{
				"main":{
					templateUrl:"tpls/start.html",
					controller:"startController"
				}
			}
		})
		.state("enter",{
			url:"/enter",
			views:{
				"main":{
					templateUrl:"tpls/enter.html"
				}
			}
		})
		.state("register",{
			url:"/register",
			views:{
				"main":{
					templateUrl:"tpls/register.html"
				},
				"backBtn":{
					templateUrl:"tpls/backBtn.html"
				}
			}
		})
		.state("login",{
			url:"/login",
			views:{
				"main":{
					templateUrl:"tpls/login.html"
				},
				"backBtn":{
					templateUrl:"tpls/backBtn.html"
				}
			}
		})
		.state("notice",{
			url:"/notice",
			views:{
				"main":{
					templateUrl:"tpls/notice.html"
				},
				"backBtn":{
					templateUrl:"tpls/backBtn.html"
				}
			}
		})
		.state("role",{
			url:"/role",
			views:{
				"main":{
					templateUrl:"tpls/role.html"
				},
				"backBtn":{
					templateUrl:"tpls/backBtn.html"
				}
			}
		})
		.state("list",{
			url:"/list/:zone",
			views:{
				"main":{
					templateUrl:"tpls/list.html"
				},
				"backBtn":{
					templateUrl:"tpls/backBtn.html"
				}
			}
		})
		.state("bean",{
			url:"/bean/:id",
			views:{
				"main":{
					templateUrl:"tpls/bean.html"
				},
				"backBtn":{
					templateUrl:"tpls/backBtn.html"
				}
			}
		})
		.state("rank",{
			url:"/rank",
			views:{
				"main":{
					templateUrl:"tpls/rank.html"
				},
				"backBtn":{
					templateUrl:"tpls/backBtn.html"
				}
			}
		})
		.state("upload",{
			url:"/upload",
			views:{
				"main":{
					templateUrl:"tpls/upload.html"
				},
				"backBtn":{
					templateUrl:"tpls/backBtn.html"
				}
			}
		})
		.state("bang",{
			url:"/bang",
			views:{
				"main":{
					templateUrl:"tpls/bang.html"
				},
				"backBtn":{
					templateUrl:"tpls/backBtn.html"
				}
			}
		})
		.state("redpack",{
			url:"/redpack",
			views:{
				"main":{
					templateUrl:"tpls/redpack.html"
				},
				"backBtn":{
					templateUrl:"tpls/backBtn.html"
				}
			}
		})
	}])

});
