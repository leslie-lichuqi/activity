<%@page import="com.activity.tencent.Utils.TencentApi"%>
<%@page import="com.activity.tencent.Utils.TencentApiFactory"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="java.io.File"%>
<%@ page language="java"
	import="java.util.*"
	pageEncoding="UTF-8"%>
<%
	String code = request.getParameter("code");
	String redirect_uri = request.getParameter("redirect_uri")==null?"":request.getParameter("redirect_uri");
	String scope = request.getParameter("scope")==null||"".equals(request.getParameter("scope"))?"base":request.getParameter("scope");
	String state = request.getParameter("state")==null||"".equals(request.getParameter("state"))?"":request.getParameter("state");
	TencentApi api =  TencentApiFactory.getInstance(TencentApiFactory.DXTSERVICE);
	try{
		String info = "";
		if(scope.equals("base")){
	info = api.getSpecialToken(code);
		}else if(scope.equals("userinfo")){
	info = api.getUserinfo(code);
		}
		//JSONObject jo = JSONObject.fromObject(info);
		if(info.length()>0&&redirect_uri.length()>0){
			response.sendRedirect(redirect_uri+"?code="+info);
		}else{
	throw new Exception();
		}
	}catch(Exception e){
		String url = request.getRequestURL()+"?"+ request.getQueryString();
		if(scope.equals("userinfo")){
	response.sendRedirect(api.genUrl(url, state, TencentApi.SCOPE_USERINFO));
		}else{
	response.sendRedirect(api.genUrl(url, state, TencentApi.SCOPE_BASE));
		}
	}
%>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
    </head>
    <body>
        <script type="text/javascript">
            var ua = navigator.userAgent.toLowerCase();
            var isWeixin = ua.indexOf('micromessenger') != -1;
            var isAndroid = ua.indexOf('android') != -1;
            var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
            // function onReady(){
            //     if(isAndroid) {
            //         if (history.length && history.length > 1) {
            //             history.back();
            //         } else {
            //             WeixinJSBridge.invoke('closeWindow');
            //         }
            //     }
            // }
            // document.addEventListener?document.addEventListener("WeixinJSBridgeReady",onReady,!1):document.attachEvent&&document.attachEvent("onWeixinJSBridgeReady",onReady);
            if (!isWeixin) {
                document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/connect/zh_CN/htmledition/style/wap_err1a9853.css">';
                document.body.innerHTML = '<div class="page_msg"><div class="inner"><span class="msg_icon_wrp"><i class="icon80_smile"></i></span><div class="msg_content"><h4>请在微信客户端打开链接</h4></div></div></div>';
            }
        </script>
    </body>
</html>