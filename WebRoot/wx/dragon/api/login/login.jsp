<%@page import="java.util.List"%>
<%@page import="com.activity.Utils.JSHelper"%>
<%@page import="java.util.Date"%>
<%@page import="com.activity.DAO.ActUserDAO"%>
<%@page import="com.activity.DAO.ActUser"%>
<%@page import="net.sf.json.JSONObject"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	JSONObject rs = new JSONObject();
	rs.put("state", 200);
	if(JSHelper.ImgValid("code",request)){
		String user = request.getParameter("user");
		JSONObject j = JSONObject.fromObject(user);
		rs.put("s"," and username = '"+j.getString("username")+"' and password = '"+ j.getString("password")+"'");
		ActUserDAO d = new ActUserDAO();
		List l = d.search(1, 1, " and username = '"+j.getString("username")+"' and password = '"+ j.getString("password")+"'");
		if(l.isEmpty()){
			rs.put("state", 201);
			rs.put("data","账户密码错误");
		}else{
			 ActUser b =(ActUser) l.get(0);
			 rs.put("data", JSONObject.fromObject(b).toString());
		}
	}else{
		rs.put("state", 401);
		rs.put("data","验证码错误");
	}
	
%>
<%=rs.toString() %>
