<%@page import="com.activity.DAO.ActBangDAO"%>
<%@page import="com.activity.DAO.ActBang"%>
<%@page import="com.activity.Utils.thumbnailUtil"%>
<%@page import="com.activity.DAO.ActImageDAO"%>
<%@page import="com.activity.DAO.ActImage"%>
<%@page import="com.activity.tencent.Utils.TencentApi"%>
<%@page import="com.activity.tencent.Utils.TencentApiFactory"%>
<%@page import="net.sf.json.JSONObject"%>
<%@ page language="java"
	import="java.util.*,java.io.*"
	pageEncoding="UTF-8"%><%
	JSONObject msg = new JSONObject();
	msg.put("state", 200);
	String userid = request.getParameter("userid");
	ActBang b = new ActBang();
	ActBangDAO d = new ActBangDAO();
	List l = d.findByUserid(Integer.valueOf(userid));
	if(!l.isEmpty()){
		b = (ActBang) l.get(0);
		msg.put("bean", b);
	}else{
		msg.put("state", 300);
	}
%>
<%=msg.toString()%>