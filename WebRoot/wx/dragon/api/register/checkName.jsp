<%@page import="java.util.List"%>
<%@page import="java.util.Date"%>
<%@page import="com.activity.DAO.ActUserDAO"%>
<%@page import="com.activity.DAO.ActUser"%>
<%@page import="net.sf.json.JSONObject"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	JSONObject rs = new JSONObject();
	rs.put("state", 200);
	String name = request.getParameter("name");
	ActUserDAO d = new ActUserDAO();
	List l = d.findByUsername(name);
	rs.put("isUser", l.isEmpty());
%>
<%=rs.toString() %>
