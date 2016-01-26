define(['jquery'],function ($) {
	function Share(data){
		this.data = {
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
	    }
		this.data = $.extend(this.data,data);
		this._init();
		this._share(this.data);
	}
	
	Share.prototype = {
		_init:function(){
			var that = this;
			$.post("/ywtx/impage/res/WXShare/getInitData.jsp","url="+encodeURI(window.location.href.split('#')[0]).replaceAll("&","%26"),function(r){
				var config = eval("("+r+")");
				wx.config({
				    debug:that.data.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId:config.appid, // 必填，公众号的唯一标识
				    timestamp:config.timestamp , // 必填，生成签名的时间戳
				    nonceStr: config.nonceStr, // 必填，生成签名的随机串
				    signature: config.signature,// 必填，签名，见附录1
				    jsApiList: [
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
				    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
			})
		},
		_share:function(data){
			var that = this;
			this.data = $.extend(this.data,data);
			wx.ready(function(){
				wx.onMenuShareAppMessage(that.data);
				wx.onMenuShareTimeline(that.data);
			})
		},
		getWx:function(){
			return wx;
		}
	}
	
	return {
        Share:Share
    }
});
