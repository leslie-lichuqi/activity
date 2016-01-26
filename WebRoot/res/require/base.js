define(['jquery','window'],function ($,lwin) {
	function Base(){
		this.userid = this.reqGetParam("user").split("-")[0];
		window.userid = this.userid;
		window.win = new lwin.lWindow();
		this.isDxt = this.userid==""?false:true;
		this.zoom = 0;
		String.prototype.replaceAll=function(reallyDo, replaceWith, ignoreCase) { 
			if (!RegExp.prototype.isPrototypeOf(reallyDo)) { 
				return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith); 
			} else { 
				return this.replace(reallyDo, replaceWith); 
			} 
		}
	}
	
	Base.prototype = {
		adapter:function(){
			if(this.isIOS()){
				var metas = document.getElementsByTagName("meta");
				for(var i=0,len=metas.length;i<len;i++){
					if(metas[i].name=="viewport"){
						metas[i].content="width=640, user-scalable=no";
					}
				}
			}
			this.zoom = $(window).width()/640;
			$("body").css("zoom",this.zoom);
			$("body").show();
			return this;
		},
		isIOS7:function(){
			return window.navigator.userAgent.indexOf("iPhone OS 7")>=0||window.navigator.userAgent.indexOf("iPhone OS 8")>=0;
		},
		isIOS:function(){
			return window.navigator.userAgent.indexOf("iPhone OS")>=0;
		},
		reqGetParam:function(paramName){
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
		},
		/*���ڱȽ� data1>date2:1 =:2 <:3*/
		dateCompare:function(date1,date2){
			date1 = date1.replace(/\-/gi,"/");
			date2 = date2.replace(/\-/gi,"/");
			var time1 = new Date(date1).getTime();
			var time2 = new Date(date2).getTime();
			if(time1 > time2){
				return 1;
			}else if(time1 == time2){
				return 2;
			}else{
				return 3;
			}
		},
		appDownload:function(){
			if (isIOS()) {
				window.location.href = "https://itunes.apple.com/cn/app/dian-xun-tong/id877441031?mt=8";
			} else {
				window.location.href = "http://dd.myapp.com/16891/464C28FB21D4D4909D751B9E4B557E40.apk?mkey=5455ce627a135ffb&f=2434&fsname=com%2Exbcx%2Edianxuntong_2%2E06_9.apk&p=.apk";
			}
			return this;
		},
		getRandomArray:function(start,end){
			var originalArray=new Array;//ԭ���� 
			//��ԭ����originalArray��ֵ 
			try{
				for (var i=start;i<=end;i++){ 
					originalArray[i]=i; 
				} 
				var d1=new Date().getTime(); 
				originalArray.sort(function(){ return 0.5 - Math.random(); });
				return originalArray;
			}catch(e){
				return null;
			}
			 
		},
		dxtShare:function(obj){
			var data = {
				imgUrl:"",
				title:"",
				link:"",
				content:""
			}
			$.extend(data,obj);
			var obj = {"content" : data.content,"pic" : data.imgUrl,"url" :data.link,"title":data.title};
			window.location='sharecommon::'+ JSON.stringify(obj);	
		}
	
	}
	return {
        Base:Base
    }
});
function shareCallBack(type){
	/*if(window.userid==0){
		return;
	}
	var params="remark=活动分享积分&refcode=event_share&user="+window.userid;
	$.post("/ywtx/imAPI/ActShareBonus.jsp",params,function(r){
		console.log(JSON.stringify(r));
		if(r.success){
			//window.w.alert({"message":"分享成功<br/>获得分享积分奖励"+r.msg.split("@@")[1]+"分","className":"logo1"});
			//window.win.alert({"message":"分享成功<br/>获得分享积分奖励"+r.msg.split("@@")[1]+"分"});
			var content = "获得分享积分奖励"+r.msg.split("@@")[1]+"分";
			//alert('dialog::{"title":"分享成功","content":"'+content+'","confirm":"确定","cancel":"取消"}');
			window.location.href = 'dialog::{"title":"分享成功","content":"'+content+'","confirm":"确定","cancel":"取消"}';
		}
	},'json');*/
}