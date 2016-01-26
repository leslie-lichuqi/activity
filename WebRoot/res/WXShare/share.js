/**
 * ҳ������jweixin-1.0.0.js,share.js
 * ����WXShare({
 * 		  debug:false,
	      title: '��Ѷͨ',
	      desc: '��Ѷͨ',
	      link: 'http://www.yuwangtianxia.com',
	      imgUrl: '',
	      trigger: function (res) {
	        // ��Ҫ������trigger��ʹ��ajax�첽�����޸ı��η�������ݣ���Ϊ�ͻ��˷��������һ��ͬ����������ʱ��ʹ��ajax�Ļذ�ỹû�з���
	      },
	      success: function (res) {
	      },
	      cancel: function (res) {
	      },
	      fail: function (res) {
	        console.log("wxshare::fail");
	      }
 * })
 * @param {} data
 */

function WXShare(data){
	this.data = {
		  debug:false,
	      title: '',
	      desc: '',
	      link: 'http://www.yuwangtianxia.com',
	      imgUrl: '',
	      trigger: function (res) {
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
	this._init(this.data.link);
	this._share(this.data);
}

WXShare.prototype = {
	_init:function(url){
		var that = this;
		console.log(encodeURI(window.location.href.split('#')[0]).replaceAll("&","%26"));
		$.post("/ywtx/impage/res/WXShare/getInitData.jsp","url="+encodeURI(window.location.href.split('#')[0]).replaceAll("&","%26")+"&t="+new Date().getTime(),function(r){
			var config = eval("("+r+")");
			wx.config({
			    debug:that.data.debug,
			    appId:config.appid, 
			    timestamp:config.timestamp , 
			    nonceStr: config.nonceStr,
			    signature: config.signature,
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
			    ] // �����Ҫʹ�õ�JS�ӿ��б?����JS�ӿ��б��¼2
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
		}
}
String.prototype.replaceAll=function(reallyDo, replaceWith, ignoreCase) { 
		if (!RegExp.prototype.isPrototypeOf(reallyDo)) { 
			return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith); 
		} else { 
			return this.replace(reallyDo, replaceWith); 
		} 
	}