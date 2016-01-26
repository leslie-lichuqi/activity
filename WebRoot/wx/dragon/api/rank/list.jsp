<%@page import="com.activity.DAO.SqlQueryHelper"%>
<%@page import="com.activity.DAO.ActUser"%>
<%@page import="com.activity.DAO.ActUserDAO"%>
<%@page import="net.sf.json.JSONArray"%>
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
	
	String pageIndex= request.getParameter("pageIndex")==null?"1":request.getParameter("pageIndex");
	String pageSize= request.getParameter("pageSize")==null?"10":request.getParameter("pageSize");
	ActImageDAO d = new ActImageDAO();
	ActUserDAO d2 = new ActUserDAO();
 String sql ="select a.id,a.userid,a.username,a.title,a.imageurl,a.zone,b.votes,(SELECT count(1)+1 from act_user as c where c.votes > b.votes) as rank"
	+" from act_image as a LEFT JOIN act_user as b on a.userid = b.id order by rank ";
	List l = new SqlQueryHelper().sqlQuery(Integer.valueOf(pageIndex), Integer.valueOf(pageSize), sql
			, new String[]{"id","userid","username","title","imageurl","zone","votes","rank"}); 
	//List l = d.search(Integer.valueOf(pageIndex), 10, " ");
	JSONArray jArr = new JSONArray();
	for(int i=0 ;i<l.size();i++){
		Object[] b = (Object[]) l.get(i);
		JSONObject j1 = new JSONObject();
		j1.put("id", b[0]);
		j1.put("userid", b[1]);
		j1.put("username", b[2]);
		j1.put("title", b[3]);
		j1.put("imageurl", b[4]);
		j1.put("zone", b[5]);
		j1.put("votes", b[6]);
		j1.put("rank", b[7]);
		jArr.add(j1);
	}
	msg.put("data", jArr);
	d.search(1, 1, "");
	msg.put("count", Math.ceil(d.RecordCount/10.0));
	msg.put("cnt", d.RecordCount);
%>
<%=msg.toString()%>