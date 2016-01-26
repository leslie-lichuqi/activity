requirejs.config({
	baseUrlL:"js/",
	paths:{
		"angular":"/activity/res/framework/ionic/js/ionic.bundle.min",
		"angular-cookies":"/activity/res/framework/angular-1.2.28/angular-cookies.min",
		"jweixin":"http://res.wx.qq.com/open/js/jweixin-1.0.0",
		
		"wxShare":"/activity/res/framework/require/wxShare/wxShare",
		
		"ionicUtil":"/activity/res/framework/require/ionic/ionicUtil",
		"controllers":"controllers",
		"services":"services",
		"config":"config/config",
		"app":"config/app"
	},
	shim:{
		"angular":{
			exports:"angular"
		},
		"angular-cookies":{
			deps:["angular"],
			exports:"angular"
		},
		"jweixin":{
			exports:"jweixin"
		}
	}
})
require(["angular","angular-cookies","jweixin","wxShare","ionicUtil","app","config"
         ,"controllers/regController","controllers/loginController","controllers/uploadController"
         ,"controllers/bangController" ,"controllers/listController","controllers/rankController"
         ,"controllers/beanController","controllers/redpackController","controllers/startController"
         ,"services/user","services/vote"],function (){
	angular.element(document).ready(function(){
		angular.bootstrap(document,["app"]);
	})
});