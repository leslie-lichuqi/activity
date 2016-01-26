(function($){
	var wxShareUtil = window.wxShareUtil || (window.wxShareUtil = {});	
	/*apiList:需要注入的接口
	 *factory:wx.ready回调
	 *http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E9.99.84.E5.BD.951-JS-SDK.E4.BD.BF.E7.94.A8.E6.9D.83.E9.99.90.E7.AD.BE.E5.90.8D.E7.AE.97.E6.B3.95
	 * 基本类
	举报: "menuItem:exposeArticle"
	调整字体: "menuItem:setFont"
	日间模式: "menuItem:dayMode"
	夜间模式: "menuItem:nightMode"
	刷新: "menuItem:refresh"
	查看公众号（已添加）: "menuItem:profile"
	查看公众号（未添加）: "menuItem:addContact"
	传播类
	
	发送给朋友: "menuItem:share:appMessage"
	分享到朋友圈: "menuItem:share:timeline"
	分享到QQ: "menuItem:share:qq"
	分享到Weibo: "menuItem:share:weiboApp"
	收藏: "menuItem:favorite"
	分享到FB: "menuItem:share:facebook"
	分享到 QQ 空间/menuItem:share:QZone
	保护类
	
	编辑标签: "menuItem:editTag"
	删除: "menuItem:delete"
	复制链接: "menuItem:copyUrl"
	原网页: "menuItem:originPage"
	阅读模式: "menuItem:readMode"
	在QQ浏览器中打开: "menuItem:openWithQQBrowser"
	在Safari中打开: "menuItem:openWithSafari"
	邮件: "menuItem:share:email"
	一些特殊公众号: "menuItem:share:brand"
	
	* 版本1.0.0接口
	onMenuShareTimeline
	onMenuShareAppMessage
	onMenuShareQQ
	onMenuShareWeibo
	onMenuShareQZone
	startRecord
	stopRecord
	onVoiceRecordEnd
	playVoice
	pauseVoice
	stopVoice
	onVoicePlayEnd
	uploadVoice
	downloadVoice
	chooseImage
	previewImage
	uploadImage
	downloadImage
	translateVoice
	getNetworkType
	openLocation
	getLocation
	hideOptionMenu
	showOptionMenu
	hideMenuItems
	showMenuItems
	hideAllNonBaseMenuItem
	showAllNonBaseMenuItem
	closeWindow
	scanQRCode
	chooseWXPay
	openProductSpecificView
	addCard
	chooseCard
	openCard
	*/
	
	wxShareUtil.getConfig = function(debug){
		var jsApiList = [
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
			    ];
		$.post("/ywtx/impage/res/WXShare/getWxCfg.jsp","",function(r){
			wx.config({
			    debug:debug?debug:false,
			    appId:r.appid,
			    timestamp:r.timestamp, 
			    nonceStr: r.nonceStr,
			    signature: r.signature,
			    jsApiList: jsApiList
			});
		},'json');
	}
	wxShareUtil.getConfig();
	
	/**
	 * options
	 * title
	 * desc
	 * link
	 * imgUrl
	 */
	wxShareUtil.share = function(options){
		var _options = {
			  debug:false,
		      title: '',
		      desc: '',
		      link: '',
		      imgUrl: '',
		      trigger: function (res) {
		      	console.log("trigger");
		      },
		      success: function (res) {
		      	console.log("success");
		      },
		      cancel: function (res) {
		      	console.log("cancel");
		      },
		      fail: function (res) {
		      	console.log("fail");
		      }
	    };
	    _options = $.extend(_options,options);
	    wx.ready(function(){
			wx.onMenuShareAppMessage(_options);
			wx.onMenuShareTimeline(_options);
			wx.onMenuShareQQ(_options);
	    })
	}
})($)