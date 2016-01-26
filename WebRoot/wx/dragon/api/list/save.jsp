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
	String rs = request.getParameter("rs");
	String userid = request.getParameter("userid");
	String username = request.getParameter("username");
	String remark = request.getParameter("remark");
	ActBang b  = new ActBang();
	ActBangDAO d = new ActBangDAO();
	b.setBang(rs);
	b.setUserid(Integer.valueOf(userid));
	b.setUsername(username);
	b.setRemark(remark);
	b.setCreatedate(new Date());
	d.save(b);
%>
<%=msg.toString()%>