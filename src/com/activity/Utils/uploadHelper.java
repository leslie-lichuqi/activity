package com.activity.Utils;

import java.io.*;
import java.util.*;

import javax.servlet.http.*;

import org.apache.commons.fileupload.*;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class uploadHelper {

	private static final String CONTENT_TYPE = "text/html; charset=utf-8";
	
	public static String SaveFile(HttpServletRequest request,
			HttpServletResponse response, String loadpath, String filename,int maxSize,boolean orgFileName)
			throws Exception {

		response.setContentType(CONTENT_TYPE);

		String rMSG = null;
		createFolder(request.getRealPath("/") + loadpath + "//temp");
		createFolder(request.getRealPath("/") + loadpath);

		// Create a factory for disk-based file items
		DiskFileItemFactory factory = new DiskFileItemFactory();

		// Set factory constraints设置最多只允许在内存中存储的数据,单位:字节
		factory.setSizeThreshold(4096);

		// 设置一旦文件大小超过getSizeThreshold()的值时数据存放在硬盘的目录(缓存)
		factory.setRepository(new File(request.getRealPath("/") + loadpath
				+ "//temp"));

		// Create a new file upload handler
		ServletFileUpload upload = new ServletFileUpload(factory);

		// Set overall request size constraint设置允许用户上传文件大小,单位:字节，这里设为3m
		upload.setSizeMax(maxSize * 1024 * 1024);
		// Parse the request
		List /* FileItem */fileItems = upload.parseRequest(request);

		// 开始读取上传信息
		// 依次处理每个上传的文件
		Iterator iter = fileItems.iterator();
		while (iter.hasNext()) {

			FileItem item = (FileItem) iter.next();

			// 忽略其他不是文件域的所有表单信息
			if (!item.isFormField()) {
				String name = item.getName();
				long size = item.getSize();
				if ((name == null || name.equals("")) && size == 0)
					continue;
				if(!orgFileName){
					name = name.substring(name.lastIndexOf("//") + 1);// 从全路径中提取文件名
					// 处理中文编码问题，前台是UTF－8，所以这里需要对应上，如果前台是gb2312的话，这里也应该是gb2312
					String ext=name.substring(name.lastIndexOf(".")).toLowerCase();
					name = filename + ext;
				}
				try {
					// 保存上传的文件到指定的目录
					// 在下文中上传文件至数据库时，将对这里改写
					File fNew = new File(request.getRealPath("/") + loadpath,
							name);
					item.write(fNew);
					// out.print(name + "  " + size + "");
					rMSG = name;
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return rMSG;
	}

	public static String SaveFile(HttpServletRequest request,
			HttpServletResponse response, String loadpath, String filename)
			throws Exception {
		return SaveFile(request, response, loadpath, filename,3,false);
	}

	public static String SaveFile(HttpServletRequest request,
			HttpServletResponse response, String loadpath,int maxSize,boolean orgFileName) throws Exception {
		return SaveFile(request, response, loadpath, UUID.randomUUID().toString(),maxSize,orgFileName);
	}
	
	public static String SaveFile(HttpServletRequest request,
			HttpServletResponse response, String loadpath) throws Exception {
		return SaveFile(request, response, loadpath, UUID.randomUUID().toString());
	}
	
	public static void createFolder(String path) {

		File file = new File(path);
		// 如果文件夹不存在则创建
		if (!file.exists() && !file.isDirectory()) {
			file.mkdir();
		}
	}
}
