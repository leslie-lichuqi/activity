angular.module("wxShare",[])
.provider("wxShareService",function(){
	var wxShareServiceProvider = {
		options:{
			  debug:false,
		      title: '店讯通',
		      desc: '店讯通',
		      link: 'http://www.yuwangtianxia.com',
		      imgUrl: '',
		      trigger: function (res) {
		        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
		      },
		      success: function (res) {
		      },
		      cancel: function (res) {
		      },
		      fail: function (res) {
		        console.log("wxshare::fail");
		      }
	    },
	    jsApiList:[
    	 	'checkJsApi',
	        'onMenuShareTimeline',
	        'onMenuShareAppMessage',
	        'onMenuShareQQ',
	        'onMenuShareWeibo',
	        'hideMenuItems',
	        'showMenuItems',
	        'hideAllNonBaseMenuItem',
	        'showAllNonBaseMenuItem',
	        'translateVoice',
	        'startRecord',
	        'stopRecord',
	        'onRecordEnd',
	        'playVoice',
	        'pauseVoice',
	        'stopVoice',
	        'uploadVoice',
	        'downloadVoice',
	        'chooseImage',
	        'previewImage',
	        'uploadImage',
	        'downloadImage',
	        'getNetworkType',
	        'openLocation',
	        'getLocation',
	        'hideOptionMenu',
	        'showOptionMenu',
	        'closeWindow',
	        'scanQRCode',
	        'chooseWXPay',
	        'openProductSpecificView',
	        'addCard',
	        'chooseCard',
	        'openCard'
		],
		setOptions:function(options){
			this.options = angular.extend({},this.options,options);
		},
		$get:["$http",function($http){
			return {
				getConfig:function(){
					return $http({
						method:"GET",
						url:"/activity/framework/res/WXShare/getWxCfg.jsp"
					}).success(function(date){
						wx.config({
						    debug:wxShareServiceProvider.options.debug,
						    appId:date.appid,
						    timestamp:date.timestamp, 
						    nonceStr: date.nonceStr,
						    signature: date.signature,
						    jsApiList: wxShareServiceProvider.jsApiList
						});
						wx.ready(function(){
							wx.onMenuShareTimeline(wxShareServiceProvider.options);
	                        wx.onMenuShareAppMessage(wxShareServiceProvider.options);
	                        wx.onMenuShareQQ(wxShareServiceProvider.options);
						})
					}).error(function(data){
						console.log("error");
					})
				},
				setOptions:function(options){
					wxShareServiceProvider.options =angular.extend({},wxShareServiceProvider.options,options);
				}
			}
		}]
	};
	return wxShareServiceProvider;
})