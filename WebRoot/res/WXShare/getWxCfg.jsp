<%@page import="com.activity.tencent.Utils.TencentApiFactory"%>
<%@page import="com.activity.tencent.Utils.TencentApi"%>
<%@page import="net.sf.json.JSONObject"%>
<%@ page language="java"
	import="java.util.*"
	pageEncoding="UTF-8"%>
<%
	//String url = request.getParameter("url");
	//System.out.println(URLEncoder.encode(new String(request.getHeader("referer").getBytes(),"UTF-8"),"UTF-8"));
	//System.out.println(URLEncoder.encode(URLDecoder.decode(request.getHeader("referer"),"UTF-8"),"UTF-8"));
	String url = request.getHeader("referer");
	String msg = "";
	if(url!=null&&!"".equals(url)){
		TencentApi api = TencentApiFactory.getInstance(TencentApiFactory.DXTSERVICE);
		msg = api.sign(url);
	}
	JSONObject rs = new JSONObject().fromObject(msg);
	
	//System.out.println(rs);
	rs.remove("jsapi_ticket");
	rs.put("isWxBrowser", request.getHeader("User-Agent").indexOf("MicroMessenger")>=0);
%>
<%=rs.toString()%>