<%@page import="java.util.regex.Pattern"%>
<%@page import="java.util.regex.Matcher"%>
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
		try{
			String user = request.getParameter("user");
		 	ActUser b = (ActUser)JSONObject.toBean(JSONObject.fromObject(user),ActUser.class);
		 	String address = b.getAddress();
		 	Pattern pattern = Pattern.compile("^[\u4e00-\u9fa5]{0,}[省]{1}[\u4e00-\u9fa5]{0,}[市]{1}[\u4e00-\u9fa5]{0,}[区]{1}[\u4e00-\u9fa5A-Za-z0-9_]{1,}$");
		 	Matcher matcher = pattern.matcher(address);
		 	String msg = "";
		 	boolean a = true;
		 	if(!matcher.matches()){
		 		a = false;
		 		msg = "地址格式错误";
		 	}
		 	pattern = Pattern.compile("^[A-Za-z]{2,10}$");
		 	matcher = pattern.matcher(b.getUsername());
		 	if(!matcher.matches()){
		 		a = false;
		 		msg = "请输入3到10英文姓名";
		 	}
		 	if(a){
				ActUserDAO d = new ActUserDAO();
				List l =  d.search(1, 1, "and (username = '"+b.getUsername()+"' or phone = '"+b.getPhone()+"')");
				if(l.isEmpty()){
					b.setVotes(0);
					b.setCreatedate(new Date());
					d.save(b);
					rs.put("data",JSONObject.fromObject(b).toString());
				}else{
					rs.put("state", 201);
					rs.put("data","已注册");
				}
				d.getSession().clear();
		 	}else{
				rs.put("state", 402);
				rs.put("data",msg);
		 	}
		}catch(Exception e){
			rs.put("state", 202);
		}
	}else{
		rs.put("state", 401);
		rs.put("data","验证码错误");
	}
%>
<%=rs.toString() %>
