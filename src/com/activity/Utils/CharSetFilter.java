package com.activity.Utils;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

public class CharSetFilter extends HttpServlet implements Filter {

	private static final long serialVersionUID = 1L;

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		
		HttpServletRequest req=(HttpServletRequest)request;
		
		// 处理字符编码
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		
	/*	boolean isWebSite=req.getRequestURI().indexOf("/wx/")>=0;
		boolean isBBF=req.getRequestURI().indexOf("/bbf/")>=0;*/
		// 自动登录

		try {
			chain.doFilter(request, response);
		} catch (java.io.IOException ex) {
			// 防止ClientAbortException（客户端下载文件过程中突然断开）写满日志文件
		}

	}
	
	
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

}
