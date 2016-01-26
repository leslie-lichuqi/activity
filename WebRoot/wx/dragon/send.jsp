<%@page import="net.sf.json.JSONArray"%>
<%@page import="com.activity.Utils.JSHelper"%>
<%@page import="com.activity.tencent.Entity.RedPack"%>
<%@page import="com.activity.DAO.ActRedpackDAO"%>
<%@page import="com.activity.DAO.ActRedpack"%>
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
	msg.put("list", 200);
	JSONArray ja = new JSONArray();
	String id = request.getParameter("id");
	TencentApi api =  TencentApiFactory.getInstance(TencentApiFactory.DXTSERVICE);
	RedPack redPack = new RedPack();
	redPack.setAct_name("“龙牡杯”POP创意大赛");
	redPack.setClient_ip("183.63.90.182");
	redPack.setRemark("感谢您的参与！点击消息拆开红包即可获得现金。");
	redPack.setSend_name("21世纪药店");
	redPack.setWishing("龙牡杯");
	try{
		ActRedpack b =null;
		ActRedpackDAO d = new ActRedpackDAO();
		List l = d.search(1, 150, " and state = 100");
		for(int i = 0;i<l.size();i++){
			b = (ActRedpack)l.get(i);
			redPack.setMch_billno(String.valueOf(b.getId()));
			redPack.setTotal_num(1);
			redPack.setTotal_amount(Integer.valueOf(b.getPrize()));
			String a = api.sendRedPack(redPack, b.getOpenid());
			JSONObject rs = new JSONObject().fromObject(a).getJSONObject("xml");
			if("SUCCESS".equals(rs.getString("result_code"))){
				b.setBillno(a);
				b.setState(200);
				d.attachDirty(b);
			}else{
				b.setBillno(a);
				b.setState(201);
				d.attachDirty(b);
			}
			ja.add(i, b);
		}
	}catch(Exception e){
		e.printStackTrace();
		msg.put("exception", e.getClass().getName());
	}
%>
<%=ja%>