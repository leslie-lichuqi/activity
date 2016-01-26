<%@page import="com.activity.Utils.thumbnailUtil"%>
<%@page import="com.activity.Utils.uploadHelper"%>
<%@page import="net.sf.json.JSONObject"%>
<%@ page language="java"
	import="java.util.*,java.io.*"
	pageEncoding="UTF-8"%><%
	JSONObject msg = new JSONObject();
	msg.put("state", true);
	String strFilepath = "";
	String strFileName="";
	String thumbFilePath="";
	String id=request.getParameter("id");
	String path=request.getParameter("path");
	Date d = new Date();
	//File file = new File(request.getRealPath("/") + "\\" + path + "\\" + id + "\\" );
	
	File file = new File(request.getRealPath("/") + "\\" + path + "\\"  );
	
	// 如果文件夹不存在则创建
	if (!file.exists() && !file.isDirectory()) {
		file.mkdir();
	}
	
	file = new File(request.getRealPath("/") + "\\" + path + "\\" + id + "\\" );
	
	if (!file.exists() && !file.isDirectory()) {
		file.mkdir();
	}
	
	String filePath = "\\" + path + "\\" + id + "\\";
	try{
		strFileName=uploadHelper.SaveFile(request, response, filePath,5,false);
		strFilepath = filePath + strFileName;
		String ext=strFileName.substring(strFileName.lastIndexOf(".")).toLowerCase();
		thumbFilePath=filePath + strFileName.substring(0,strFileName.lastIndexOf("."))+"_thumb"+ext;
		thumbnailUtil.saveImageAsJpg(request.getRealPath("/")+strFilepath,request.getRealPath("/")+thumbFilePath, 640, 480);
		msg.put("imageurl", "/activity"+strFilepath.replace("\\", "/"));
	}catch(SecurityException se){
		msg.put("state", false);
		msg.put("msg", "上传图片超过5m");
		se.printStackTrace();
	}catch (Exception e) {
		e.printStackTrace();
		msg.put("state", false);
		msg.put("msg", "上传图片超过5m");
	}
	response.setContentType("text/html");
%><%=msg.toString()%>