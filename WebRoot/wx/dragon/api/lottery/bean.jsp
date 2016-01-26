<%@page import="com.activity.DAO.ActRedpackDAO"%>
<%@page import="com.activity.DAO.ActRedpack"%>
<%@page import="com.activity.tencent.Utils.TencentApi"%>
<%@page import="com.activity.tencent.Utils.TencentApiFactory"%>
<%@page import="net.sf.json.JSONObject"%>
<%@ page language="java"
	import="java.util.*,java.io.*"
	pageEncoding="UTF-8"%><%
	JSONObject msg = new JSONObject();
	msg.put("state", 200);
	String userid = request.getParameter("userid");
	String openid = request.getParameter("openid");
	ActRedpack b = new ActRedpack();
	ActRedpackDAO d = new ActRedpackDAO();
	try{
		List l = d.search(1, 1, " and (openid = '"+openid+"' or userid = "+userid+") ");
		if(!l.isEmpty()){
			b = (ActRedpack) l.get(0);
			msg.put("amount", Double.valueOf(b.getPrize())/100);
		}else{
			msg.put("state", 300);
		}
	}catch(Exception e){
		msg.put("state", 400);
	}
	System.out.println(" and (openid = '"+openid+"' or userid = "+userid+") ");
%>
<%=msg.toString()%>