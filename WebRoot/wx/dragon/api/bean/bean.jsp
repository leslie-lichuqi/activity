<%@page import="com.activity.DAO.ActUser"%>
<%@page import="com.activity.DAO.ActUserDAO"%>
<%@page import="com.activity.DAO.ActImageDAO"%>
<%@page import="com.activity.DAO.ActImage"%>
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
	String id = request.getParameter("id");
	ActImage b = new ActImage();
	ActImageDAO d = new ActImageDAO();
	try{
		List l = d.search(1, 1, " and id = "+id);
		if(!l.isEmpty()){
			b = (ActImage) l.get(0);
			ActUserDAO d2 = new ActUserDAO();
			ActUser b2 = d2.findById(b.getUserid());
			msg.put("image", b);
			msg.put("user",b2);
		}else{
			msg.put("state", 300);
		}
	}catch(Exception e){
		msg.put("state", 400);
	}
%>
<%=msg.toString()%>