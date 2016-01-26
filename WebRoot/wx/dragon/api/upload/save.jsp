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
	String serverId = request.getParameter("serverId");
	String userid = request.getParameter("userid");
	String username = request.getParameter("username");
	String zone = request.getParameter("zone");
	String title = request.getParameter("title");
	File file = new File(request.getRealPath("/")+"dragon");
	if(!file.exists()&&!file.isDirectory()){
		file.mkdir();
	}
	file = new File(request.getRealPath("/")+"dragon/"+userid);
	if(!file.exists()&&!file.isDirectory()){
		file.mkdir();
	}
	try{
		TencentApi api = TencentApiFactory.getInstance(TencentApiFactory.DXTSERVICE);
		String path = "dragon/"+userid;
		String filePath = api.downloadMedia(serverId, request.getRealPath("/")+path);
		String strFileName=filePath.substring(filePath.lastIndexOf("/")+1);
		String strFilepath = path +"/"+ strFileName;
		String ext=strFileName.substring(strFileName.lastIndexOf(".")).toLowerCase();
		String thumbFilePath=path+"/"+ strFileName.substring(0,strFileName.lastIndexOf("."))+"_thumb"+ext;
		System.out.println(request.getRealPath("/")+thumbFilePath);
		thumbnailUtil.saveImageAsJpg(request.getRealPath("/")+strFilepath,request.getRealPath("/")+"/"+thumbFilePath, 640, 640);
		ActImage b = new ActImage();
		ActImageDAO d = new ActImageDAO();
		b.setImageurl(filePath.substring(filePath.indexOf("activity")-1,filePath.length()).replace("\\", "/"));
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