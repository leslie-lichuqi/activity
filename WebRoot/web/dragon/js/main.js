requirejs.config({
	baseUrlL:"js/",
	paths:{
		"angular":"/activity/res/framework/angular-1.4.3/angular.min",
		"angular-cookies":"/activity/res/framework/angular-1.4.3/angular-cookies.min",
		"angular-ui-router":"/activity/res/framework/angular-ui-router",
		"ui-bootstrap-tpls":"/activity/res/framework/require/ui-bootstrap/ui-bootstrap-tpls",
		"bootstrap-modal":"/activity/res/framework/require/bootstrapModule/bootstrap.modal",
		"ng-file-upload":"/activity/res/framework/ng-file-upload",
		
		"controllers":"controllers",
		"services":"services",
		"config":"config/config",
		"app":"config/app"
	},
	waitSeconds: 200,
	shim:{
		"angular":{
			exports:"angular"
		},
		"angular-cookies":{
			deps:["angular"],
			exports:"angular-cookies"
		},
		"angular-ui-router":{
			deps:["angular"],
			exports:"angular-ui-router"
		},
		"bootstrap-modal":{
			deps:["angular"],
			exports:"bootstrap-modal"
		},
		"ng-file-upload":{
			deps:["angular"],
			exports:"ng-file-upload"
		}
	}
})
require(["angular","angular-cookies","angular-ui-router","ui-bootstrap-tpls","bootstrap-modal","ng-file-upload",
         ,"app","config","controllers/regController","controllers/loginController"
         ,"controllers/listController","controllers/rankController","controllers/rankBarController"
         ,"controllers/bangController","controllers/uploadController","controllers/beanController"
         ,"services/user","services/vote"],function (){
	angular.element(document).ready(function(){
		angular.bootstrap(document,["app"]);
	})
});