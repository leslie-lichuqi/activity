<%@page import="com.activity.DAO.ActUserDAO"%>
<%@page import="com.activity.DAO.ActUser"%>
<%@page import="com.activity.DAO.ActVotesDAO"%>
<%@page import="com.activity.DAO.ActVotes"%>
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
	String id = request.getParameter("id");
	String username = request.getParameter("username");
	String openid = request.getParameter("openid");
	String access_token = request.getParameter("access_token");
	TencentApi api =  TencentApiFactory.getInstance(TencentApiFactory.DXTSERVICE);
	JSONObject j1 = api.auhtToken(access_token, openid);
	if("ok".equals(j1.getString("errmsg"))){
		ActVotes b = new ActVotes();
		ActVotesDAO d = new ActVotesDAO();
		List l = d.search(1, 1, " and openid = '"+openid + "' and  date_format(createdate,'%Y-%m-%d')=date_format(now(),'%Y-%m-%d')");
		if(l.isEmpty()){
			b.setOpenid(openid);
			b.setUserid(Integer.valueOf(id));
			b.setUsername(username);
			b.setCreatedate(new Date());
			ActUserDAO d2 = new ActUserDAO();
			ActUser b2 =d2.findById(b.getUserid());
			b2.setVotes(b2.getVotes()+1);
			d2.save(b2);
			d.save(b);
		}else{
			msg.put("state", 400);
		}
	}else{
		msg.put("state", 401);
	}
%>
<%=msg.toString()%>