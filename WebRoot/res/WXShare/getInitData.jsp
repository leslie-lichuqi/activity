<%@page import="java.net.URLDecoder"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="net.sf.json.JSONObject"%>
<%@ page language="java"
	import="java.util.*"
	pageEncoding="UTF-8"%>
<%
	String url = request.getParameter("url");
	//System.out.println(URLEncoder.encode(new String(request.getHeader("referer").getBytes(),"UTF-8"),"UTF-8"));
	//System.out.println(URLEncoder.encode(URLDecoder.decode(request.getHeader("referer"),"UTF-8"),"UTF-8"));
	//String url = URLEncoder.encode(URLDecoder.decode(request.getHeader("referer"),"UTF-8"),"UTF-8");
	String msg = "";
	if(url!=null&&!"".equals(url)){
		TencentApi api = TencentApiFactory.getInstance(TencentApiFactory.DXTSERVICE);
		msg = api.sign(url);
	}
	//System.out.println(msg);
%>
<%=new JSONObject().fromObject(msg).toString()%>