angular.module("bootstrap.modal",["ui.bootstrap"])
.provider("modalService",function(){
	var modalServiceProvider = {
		options:{
			templateUrl:"/ywtx/impage/res/framework/angularUtils/bootstrapModule/tpls/myModalContent.html",
			controller:"ModalInstanceCtrl",
			resolve:{
				options:function(){
					return {
					}
				}
			}
		},
		loadOptions:{
			templateUrl:"/ywtx/impage/res/framework/angularUtils/bootstrapModule/tpls/loadModalContent.html",
			resolve:{
				options:function(){
					return {
					}
				}
			},
			size:"load"
		},
		setOptions:function(options){
			modalServiceProvider.options = angular.extend({},modalServiceProvider.options,options);
		},
		setLoadOptions:function(options){
			modalServiceProvider.loadOptions = angular.extend({},modalServiceProvider.loadOptions,options);
		},
		$get:["$modal",function($modal){
			var modalService = {}
			modalService.genModal = function(options){
				var _options = angular.extend({},modalServiceProvider.options,options);
				/*var modalInstanceOptions = {
			      animation: true,
			      templateUrl: options.templeteUrl?options.templeteUrl:modalServiceProvider.options.templeteUrl,
			      controller: options.controller?options.controller:modalServiceProvider.options.controller,
			      size: modalServiceProvider.size,
			      resolve: {
			        options: function () {
			          return angular.extend({},modalServiceProvider.options,options);
			        }
			      }
			      //,scope:$scope
				}*/
				
				/*if(options.scope){
					_options.scope = options.scope;
				}*/
				//console.log(_options);
				var modalInstance = $modal.open(_options);
				return modalInstance;
			},
			modalService.genLoadModal =function(title){
				var _options = modalServiceProvider.loadOptions;
				_options.resolve = {
					options:function(){
						return angular.extend({},{title:title});
					}
				}
				var modalInstance = $modal.open(_options);
				return modalInstance;
			}
			return modalService;
		}]
	};
	return modalServiceProvider;
})
.controller("ModalInstanceCtrl",function ($scope, $modalInstance,options) {
	  var baseOptions = {
			title:"提示",
			content:"内容",
			okBtnTxt:"确定",
			closeBtnTxt:"取消"
	  }
	  $scope.options = angular.extend({},baseOptions,options)
	  $scope.ok = function () {
	    $modalInstance.close(true);
	  };
	
	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
})
.controller("loadModalInstanceCtrl",function (options) {
	  $scope.options = angular.extend({title:"正在处理"},options);
})
//.config(["modalServiceProvider",function(modalServiceProvider){
//	var options = {
//		
//	}
//	modalServiceProvider.setOptions(options);
//}])