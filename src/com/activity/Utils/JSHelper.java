package com.activity.Utils;

import java.awt.image.BufferedImage;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import com.aliyun.openservices.oss.OSSClient;


public class JSHelper {
	public static SimpleDateFormat SFDate = new SimpleDateFormat("yyyy-MM-dd");
	public static SimpleDateFormat SFBillCode = new SimpleDateFormat(
			"yyyyMMddHHmmss");
	public static SimpleDateFormat SFTime = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");
	
	public static boolean ImgValid(String code,HttpServletRequest req){
		return req.getParameter(code).toString().toUpperCase().equals(req.getSession(true).getAttribute("IMGVALID").toString().toUpperCase());	
	}

	public static String writeHTML(String strHTML) {
		return "<!DOCTYPE html>\n"
				+ "<html>\n"
				+ "  <head>\n"
				+ "  <script type=\"text/javascript\" src=\"../res/lib/jquery-1.4.4.min.js\"></script>\n"
				+ "  </head>\n" + "  <body>\n" + "\n" + strHTML + "  </body>\n"
				+ "</html>";

	}

	public static String writeHTML(String strHTML, String pathFix) {
		return "<!DOCTYPE html>\n" + "<html>\n" + "  <head>\n"
				+ "  <script type=\"text/javascript\" src=\"" + pathFix
				+ "/res/lib/jquery-1.4.4.min.js\"></script>\n" + "  </head>\n"
				+ "  <body>\n" + "\n" + strHTML + "  </body>\n" + "</html>";

	}

	public static String Alert(String message) {
		return "<script type='text/javascript'>$(function (){alert('" + message
				+ "')});</script>";
	}

	public static String Alert(String message, String jsStr) {
		return "<script type='text/javascript'>$(function (){alert('" + message
				+ "');" + jsStr + ";});</script>";
	}

	public static String ParentRefresh() {
		return "<script type='text/javascript'>$(function (){window.parent.location.reload();});</script>";
	}

	public static String SelfRefresh() {
		return "<script type='text/javascript'>$(function (){window.location.reload();});</script>";
	}

	public static String genSelectOption(String text, String val, Object DataVal) {
		if (DataVal == null || !val.equals(DataVal.toString())) {
			return "<option value='" + val + "'>" + text + "</option>\r\n";
		} else {
			return "<option value='" + val + "' selected>" + text
					+ "</option>\r\n";
		}
	}

	public static String genSelectOption(String text, String val,
			Object DataVal, String attr) {
		if (DataVal == null || !val.equals(DataVal.toString())) {
			return "<option value='" + val + "' " + attr + ">" + text
					+ "</option>\r\n";
		} else {
			return "<option value='" + val + "'  " + attr + " selected>" + text
					+ "</option>\r\n";
		}
	}

	public static String genNotExistsSelectOption(String text, String val,
			String DataVal) {

		if (val.equals(DataVal)) {
			return "";
		} else {
			return "<option value='" + val + "'>" + text + "</option>\r\n";
		}
	}

	public static String ScriptBlock(String script) {
		return "<script type='text/javascript'>\r\n" + script + "\r\n</script>";
	}

	public static String go(String str, String url) {

		return "<a href='#' onclick='window.location=\"" + url + "\"'>" + str
				+ "</a>";
	}

	public static String getFavicon(String url) {
		try {
			String[] aryUrl = url.replace("http://", "").split("/");
			return "http://" + aryUrl[0] + "/favicon.ico";
		} catch (Exception ex) {
			return "";
		}
	}

	public static String toUtf8String(String s) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < s.length(); i++) {
			char c = s.charAt(i);
			if (c >= 0 && c <= 255) {
				sb.append(c);
			} else {
				byte[] b;
				try {
					b = Character.toString(c).getBytes("utf-8");
				} catch (Exception ex) {
					System.out.println(ex);
					b = new byte[0];
				}
				for (int j = 0; j < b.length; j++) {
					int k = b[j];
					if (k < 0)
						k += 256;
					sb.append("%" + Integer.toHexString(k).toUpperCase());
				}
			}
		}
		return sb.toString();
	}

	public static String getSizeWithUnit(Long size) {
		if (size >= 1024 * 1024 * 1024) { // G
			return size / (1024 * 1024 * 1024) + "G";
		} else if (size >= 1024 * 1024) { // M
			return size / (1024 * 1024) + "M";
		} else if (size >= 1024) { // KB
			return size / (1024) + "KB";
		} else {
			return size / (1024) + "B";
		}
	}

	public static String getFilePathOrICON(String str, String PathFix) {
		String extName = str.substring(str.length() - 3, str.length())
				.toLowerCase();

		if (extName.equals("bmp") || extName.equals("png")
				|| extName.equals("jpg") || extName.equals("gif")) {
			return "src='" + str + "'  onerror=\"this.src='" + PathFix
					+ "/res/img/defaultFileImg.jpg'\"";
		} else {

			return "src='" + PathFix + "/res/img/" + extName.toUpperCase()
					+ ".jpg' onerror=\"this.src='" + PathFix
					+ "/res/img/defaultFileImg.jpg'\"";
		}
	}

	// pngͼ��
	public static String getFilePathOrICONpng(String str, String PathFix) {
		String extName = str.substring(str.length() - 3, str.length())
				.toLowerCase();
		if (extName.equals("bmp") || extName.equals("png")
				|| extName.equals("jpg") || extName.equals("gif")) {
			return "src='" + str + "'  onerror=\"this.src='" + PathFix
					+ "/m/img/icont/other.png'\"";
		} else {

			return "src='" + PathFix + "/m/img/icont/" + extName.toUpperCase()
					+ ".png' onerror=\"this.src='" + PathFix
					+ "/m/img/icont/other.png'\"";
		}
	}

	public static String getSexICON(Integer sex, String pathFix) {
		if (sex == null || sex == 0) {
			return "<img src='" + pathFix + "/res/images/friend_t.gif' />";
		} else {
			return "<img src='" + pathFix + "/res/images/city_ico02.gif' />";
		}
	}

	public static String PPSFileUrl(HttpServlet ser) {
		return ser.getServletContext().getInitParameter("PPSFileUrl");
	}

	public static String cutStr(String str, int len) {
		if (str == null || str.equals("")) {
			return "";
		}

		if (str.length() > len) {
			return str.substring(0, len) + "..";
		} else {
			return str;
		}
	}

	public static String cutStr2(String str, int len) {
		if (str == null || str.equals("")) {
			return "";
		}

		if (str.length() > len) {
			return str.substring(0, len - 8) + ".."
					+ str.substring(str.length() - 6);
		} else {
			return str;
		}
	}

	public static BufferedImage buildQRCodeForResFile(
			HttpServletRequest request, String content, String filePath) {
		String imgPath = request.getRealPath("QRCode") + "\\" + filePath;
		return new TwoDimensionCode().encoderQRCode(content, imgPath);
	}

	public static String encode(String s) {
		return URLEncoder.encode(s);
	}

	public static Double calcDistance(Double x1, Double y1, Double x2, Double y2) {
		Double d = Math.abs(Math.sqrt(Math
				.pow(x1 * 111321.4 - x2 * 111321.4, 2)
				+ Math.pow(y1 * 111321.4 - y2 * 111321.4, 2)));
		if (d < 50) {
			return Double.valueOf(50);
		} else {
			return Double.valueOf(d);
		}
	}
	
	public static String getOSSUrl(String key){
		String k = key.replace("http://oss.yuwangtianxia.com/","").replace("http://ywtx.oss-cn-qingdao.aliyuncs.com/", "");
		String endpoint = "http://oss-cn-qingdao.aliyuncs.com";
		if(key.contains("http://oss.yuwangtianxia.com/")){
			endpoint = "http://oss.yuwangtianxia.com";
		}
		Date expiration = new Date(new Date().getTime() + 3600 * 1000);
		OSSClient client = new OSSClient(endpoint, "5W6hiBXGIIHjzB1K", "V5tc88dbDsZW7dixOrEjgxeqQXEEBD");
		URL url = client.generatePresignedUrl("ywtx", k, expiration);	
		return url.toString();
	}

}
