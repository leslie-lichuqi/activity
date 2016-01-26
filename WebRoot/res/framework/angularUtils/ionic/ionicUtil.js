angular.module("ionicUtil",["ionic"])
.provider("ionicUtilService",function(){
	var ionicUtilServiceProvider = {
		alertOptions:{
			title: '提示信息',// String. The title of the popup.
			cssClass:'',// String, The custom CSS class name
			subTitle: '', // String (optional). The sub-title of the popup.
			template: '',// String (optional). The html template to place in the popup body.
			templateUrl:'',// String (optional). The URL of an html template to place in the popup body.
			okText:"确定", // String (default: 'OK'). The text of the OK button.
			okType:"btn-type-default"// String (default: 'button-positive'). The type of the OK button.
		},
		confirmOptions:{
			title: '', // String. The title of the popup.
			cssClass: '', // String, The custom CSS class name
			subTitle: '', // String (optional). The sub-title of the popup.
			template: '', // String (optional). The html template to place in the popup body.
			templateUrl: '', // String (optional). The URL of an html template to place in the popup body.
			cancelText: '', // String (default: 'Cancel'). The text of the Cancel button.
			cancelType: '', // String (default: 'button-default'). The type of the Cancel button.
			okText: '', // String (default: 'OK'). The text of the OK button.
			okType: '' // String (default: 'button-positive'). The type of the OK button.
		},
		promptOptions:{
			title: '', // String. The title of the popup.
			cssClass: '', // String, The custom CSS class name
			subTitle: '', // String (optional). The sub-title of the popup.
			template: '', // String (optional). The html template to place in the popup body.
			templateUrl: '', // String (optional). The URL of an html template to place in the popup body.
			inputType: '',// String (default: 'text'). The type of input to use
			inputPlaceholder: '',// String (default: ''). A placeholder to use for the input.
			cancelText: '',// String (default: 'Cancel'. The text of the Cancel button.
			cancelType: '',// String (default: 'button-default'). The type of the Cancel button.
			okText: '',// String (default: 'OK'). The text of the OK button.
			okType: ''// String (default: 'button-positive'). The type of the OK button.
		},
		showOptions:{
			title: '', // String. The title of the popup.
			cssClass: '', // String, The custom CSS class name
			subTitle: '', // String (optional). The sub-title of the popup.
			template: '', // String (optional). The html template to place in the popup body.
			templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
			scope: null, // Scope (optional). A scope to link to the popup content.
			buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.
			    text: 'Cancel',
			    type: 'button-default',
			    onTap: function(e) {
			      // e.preventDefault() will stop the popup from closing when tapped.
			      e.preventDefault();
			    }
				}, {
			    text: 'OK',
			    type: 'button-positive',
			    onTap: function(e) {
			      // Returning a value will cause the promise to resolve with the given value.
			      return scope.data.response;
			    }
			}]
		},
		loadOptions:{
			template:'',//{string=} The html content of the indicator.
			templateUrl:"",//{string=}The url of an html template to load as the content of the indicator.
			scope :null,//{object=} The scope to be a child of. Default: creates a child of $rootScope.
			noBackdrop:true,//{boolean=} Whether to hide the backdrop. By default it will be shown.
			hideOnStateChange:false,//{boolean=} Whether to hide the loading spinner when navigating to a new state. Default false.
			delay:0,//{number=} How many milliseconds to delay showing the indicator. By default there is no delay
			duration:null//{number=} How many milliseconds to wait until automatically hiding the indicator. By default, the indicator will be shown until .hide() is called.
		},
		setAlertOptions:function(options){
			ionicUtilServiceProvider.alertOptions = angular.extend({},ionicUtilServiceProvider.alertOptions,options);
		},
		setConfirmOptions:function(options){
			ionicUtilServiceProvider.confirmOptions = angular.extend({},ionicUtilServiceProvider.confirmOptions,options);
		},
		setPromptOptions:function(options){
			ionicUtilServiceProvider.promptOptions = angular.extend({},ionicUtilServiceProvider.promptOptions,options);
		},
		setShowOptions:function(options){
			ionicUtilServiceProvider.showOptions = angular.extend({},ionicUtilServiceProvider.showOptions,options);
		},
		setLoadOptions:function(options){
			ionicUtilServiceProvider.loadOptions = angular.extend({},ionicUtilServiceProvider.loadOptions,options);
		},
		$get:["$ionicPopup","$ionicLoading",function($ionicPopup,$ionicLoading){
			return {
				alert:function(options){
					var opt = angular.extend({},ionicUtilServiceProvider.alertOptions,options);
					return $ionicPopup.alert(opt);
				},
				confirm:function(options){
					var opt = angular.extend({},ionicUtilServiceProvider.confirmOptions,options);
					return $ionicPopup.confirm(opt);
				},
				prompt:function(options){
					var opt = angular.extend({},ionicUtilServiceProvider.promptOptions,options);
					return $ionicPopup.prompt(opt);
				},
				show:function(options){
					var opt = angular.extend({},ionicUtilServiceProvider.showOptions,options);
					return $ionicPopup.show(opt);
				},
				loading:function(options){
					var opt = angular.extend({},ionicUtilServiceProvider.loadOptions,options);
					return $ionicLoading.show(opt);
				},
				hideLoading:function(){
					$ionicLoading.hide()
				}
			};
		}]
	};
	return ionicUtilServiceProvider;
})
