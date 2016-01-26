define(['jquery','jweixin'],function ($,wx) {
	function Share(data){
		this.data = {
			  debug:false,
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
				    debug:that.data.debug, // ��������ģʽ,���õ�����api�ķ���ֵ���ڿͻ���alert��������Ҫ�鿴����Ĳ��������pc�˴򿪣�������Ϣ��ͨ��log���������pc��ʱ�Ż��ӡ��
				    appId:config.appid, // ������ںŵ�Ψһ��ʶ
				    timestamp:config.timestamp , // ������ǩ���ʱ���
				    nonceStr: config.nonceStr, // ������ǩ������
				    signature: config.signature,// ���ǩ���¼1
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
				wx.onMenuShareQQ(that.data);
				wx.onMenuShareWeibo(that.data);
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
