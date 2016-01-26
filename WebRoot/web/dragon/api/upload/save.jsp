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
	String imageurl = request.getParameter("imageurl");
	String userid = request.getParameter("userid");
	String username = request.getParameter("username");
	String zone = request.getParameter("zone");
	String title = request.getParameter("title");
	try{
		ActImage b = new ActImage();
		ActImageDAO d = new ActImageDAO();
		b.setImageurl(imageurl);
		b.setUserid(Integer.valueOf(userid));
		b.setUsername(username);
		b.setTitle(title);
		b.setZone(zone);
		b.setCreatedate(new Date());
		d.save(b);
		msg.put("data", "保存成功");
	}catch(Exception e){
		msg.put("state", 300);
		msg.put("data", "保存失败");
	}
%>
<%=msg.toString()%>