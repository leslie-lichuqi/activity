package com.activity.tencent.Utils;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.util.Formatter;
import java.util.List;
import java.util.UUID;

import net.sf.json.JSONObject;

import org.json.JSONException;
import org.json.XML;

import com.activity.tencent.Entity.Product;
import com.activity.tencent.Entity.RedPack;
import com.activity.tencent.Entity.SendReqData;
import com.activity.tencent.Entity.SendValue;

public class TencentApi {
    private static Long time = System.currentTimeMillis();
    
    private static Long token_time = System.currentTimeMillis();
    
    private static String jsapi_ticket; 
    
    private static String token; 
    
    private String appid ;
    
    private String appsecret ;
    
    private String mch_id ;
    
    private String app_key ;
    
    //private static final String MCH_ID = "1243749002";//商户平台
    //private static final String APP_KEY = "a07dwwlzUfFMYc2OMAfabAu1VZiMoYm4";//商户平台密钥
    
    public String getAppid() {
		return appid;
	}

	public void setAppid(String appid) {
		this.appid = appid;
	}

	public String getAppsecret() {
		return appsecret;
	}

	public void setAppsecret(String appsecret) {
		this.appsecret = appsecret;
	}

	public String getMch_id() {
		return mch_id;
	}

	public void setMch_id(String mch_id) {
		this.mch_id = mch_id;
	}

	public String getApp_key() {
		return app_key;
	}

	public void setApp_key(String app_key) {
		this.app_key = app_key;
	}

	public TencentApi(String appid, String appsecret, String mch_id,
			String app_key) {
		super();
		this.appid = appid;
		this.appsecret = appsecret;
		this.mch_id = mch_id;
		this.app_key = app_key;
	}

	public  String getTicket() throws IOException{
    	// 拼凑get请求的URL字串，使用URLEncoder.encode对特殊和不可见字符进行编码 
    	//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx090220810138b296&secret=8b206b585b0509b1179598211c1cbea6
    	Long now = System.currentTimeMillis();
    	if(now-time>=7200000||jsapi_ticket==null){
    		time = now;
	    	String url = Constant.TICKET_API+"access_token="+getToken()+"&type=jsapi";
	        URL getUrl = new URL(url); 
	
	        // 根据拼凑的URL，打开连接，URL.openConnection()函数会根据 URL的类型，返回不同的URLConnection子类的对象，在这里我们的URL是一个http，因此它实际上返回的是HttpURLConnection 
	
	        HttpURLConnection connection = (HttpURLConnection) getUrl.openConnection(); 
	
	        // 建立与服务器的连接，并未发送数据 
	
	        connection.connect(); 
	        // 发送数据到服务器并使用Reader读取返回的数据 
	
	        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream())); 
	
	        String lines = reader.readLine(); 
	
	        reader.close(); 
	
	        // 断开连接 
	
	        connection.disconnect(); 
	        
	        JSONObject jsonObject = JSONObject.fromObject(lines);
	        jsapi_ticket = (String)jsonObject.get("ticket");
	        return (String)jsonObject.get("ticket");
    	}else{
    		return jsapi_ticket;
    	}
    }
    
    public  String getToken() throws IOException{
    	// 拼凑get请求的URL字串，使用URLEncoder.encode对特殊和不可见字符进行编码 
    	//https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx090220810138b296&secret=8b206b585b0509b1179598211c1cbea6
    	Long now = System.currentTimeMillis();
		if(now-token_time>=7200000||token==null){
			token_time = now;
	    	String url = new String().format(Constant.COMMONTOKEN_API,this.appid,this.appsecret);
	        URL getUrl = new URL(url); 
	
	        // 根据拼凑的URL，打开连接，URL.openConnection()函数会根据 URL的类型，返回不同的URLConnection子类的对象，在这里我们的URL是一个http，因此它实际上返回的是HttpURLConnection 
	
	        HttpURLConnection connection = (HttpURLConnection) getUrl.openConnection(); 
	        // 建立与服务器的连接，并未发送数据 
	
	        connection.connect(); 
	        // 发送数据到服务器并使用Reader读取返回的数据 
	
	        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream())); 
	
	        String lines = reader.readLine(); 
	
	        reader.close(); 
	
	        // 断开连接 
	        connection.disconnect(); 
	        JSONObject jsonObject = JSONObject.fromObject(lines);
	        token = (String)jsonObject.get("access_token");
    	}
        return token;
    }
    
    /**
     * 
     * @param openid 用户的唯一标识
     * @param code 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
     * @return {"errcode":0,"errmsg":"ok"}
     */
    public String authorised(String openid,String accessToken) {
    	String tokenJSONString;
		try {
			String url = String.format(Constant.ACCESSTOKEN_API,accessToken,openid);
			String rs = get(url);
			return rs;
		} catch (MalformedURLException e) {
			e.printStackTrace();
			return "{\"error\":\"url错误\"}";
			
		} catch (IOException e) {
			e.printStackTrace();
			return "{\"error\":\"IOException\"}";
		} 
	}
    public  String sign(String url) throws IOException {
    	getTicket();
        String rs = "";
        String nonce_str = create_nonce_str();
        String timestamp = create_timestamp();
        String string1;
        String signature = "";

        //注意这里参数名必须全部小写，且必须有序
        string1 = "jsapi_ticket=" + jsapi_ticket +
                  "&noncestr=" + nonce_str +
                  "&timestamp=" + timestamp +
                  "&url=" + url;
        try
        {
            MessageDigest crypt = MessageDigest.getInstance("SHA-1");
            crypt.reset();
            crypt.update(string1.getBytes("UTF-8"));
            signature = byteToHex(crypt.digest());
        }
        catch (NoSuchAlgorithmException e)
        {
            e.printStackTrace();
        }
        catch (UnsupportedEncodingException e)
        {
            e.printStackTrace();
        }
        rs="{timestamp:"+timestamp+",nonceStr:\""+nonce_str+"\",jsapi_ticket:\""+jsapi_ticket+"\",signature:\""+signature+"\",url:\""+url+"\",appid:\""+this.appid+"\"}";
        
        return rs;
    }

    private static String byteToHex(final byte[] hash) {
        Formatter formatter = new Formatter();
        for (byte b : hash)
        {
            formatter.format("%02x", b);
        }
        String result = formatter.toString();
        formatter.close();
        return result;
    }

    private static String create_nonce_str() {
        return UUID.randomUUID().toString();
    }

    private static String create_timestamp() {
        return Long.toString(System.currentTimeMillis() / 1000);
    }
    /**
     * 
     * @param serverId:mediaID
     * @param filePath:下载的图片保存地址
     * @throws IOException
     */
    public String downloadMedia(String serverId,String filePath) throws IOException{
		String token = getToken();
		String url = String.format(Constant.DOWNLOADMEIDA_API, token,serverId);
		return downloadFromUrl(url, filePath,serverId);
    //	FileUtils.copyURLToFile(source, destination)
    }
    
    private static String downloadFromUrl(String url,String filePath,String mediaId) {
    	/*try {  
			URL httpurl = new URL(url);  
			//String fileName = getFileNameFromUrl(url);
			File f = new File(filePath);  
			FileUtils.copyURLToFile(httpurl, f);  
		} catch (Exception e) {  
		     e.printStackTrace(); 
		     return false;
		}  */
    	String path = null;
    	 try {
    	      URL httpurl = new URL(url);
    	      HttpURLConnection conn = (HttpURLConnection) httpurl.openConnection();
    	      conn.setDoInput(true);
    	      conn.setRequestMethod("GET");
    	      File file = new File(filePath);
    	      if(!file.isDirectory()){
    	    	  file.mkdir();
    	      }
    	      if (!filePath.endsWith("/")) {
    	    	  filePath += "/";
    	      }
    	      // 根据内容类型获取扩展名
    	      String fileExt = conn.getHeaderField("Content-Type");
    	      fileExt ="."+fileExt.substring(fileExt.indexOf("/")+1,fileExt.length());
    	      // 将mediaId作为文件名
    	      path = filePath + mediaId + fileExt;

    	      BufferedInputStream bis = new BufferedInputStream(conn.getInputStream());
    	      FileOutputStream fos = new FileOutputStream(new File(path));
    	      byte[] buf = new byte[8096];
    	      int size = 0;
    	      while ((size = bis.read(buf)) != -1)
    	        fos.write(buf, 0, size);
    	      fos.close();
    	      bis.close();

    	      conn.disconnect();
    	      String info = String.format("下载媒体文件成功，filePath=" + path);
    	    } catch (Exception e) {
    	      path = null;
    	      String error = String.format("下载媒体文件失败：%s", e);
    	    }
    	return path;
	}
    
    /**
	 * @param code 网页授权获取token api 是填写第一步获取的code参数
	 * @return 
	*access_token	网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
	*expires_in	access_token接口调用凭证超时时间，单位（秒）
	*refresh_token	用户刷新access_token
	*openid	用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户和公众号唯一的OpenID
	*scope	用户授权的作用域，使用逗号（,）分隔
	*unionid	只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。详见：获取用户个人信息（UnionID机制）
	*正确时返回的JSON数据包如下：
	{
	   "access_token":"ACCESS_TOKEN",
	   "expires_in":7200,
	   "refresh_token":"REFRESH_TOKEN",
	   "openid":"OPENID",
	   "scope":"SCOPE",
	   "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
	}
	*/
    public  String getSpecialToken(String code) throws MalformedURLException, IOException{
    	String url = String.format(Constant.TOKEN_API,this.appid,this.appsecret,code);
    	String rs;
		rs = get(url);
    	return rs;
    }
    
    /**
     * 
     * @param code 是填写第一步获取的code参数
     * @return
     */
    public  String getUserinfo(String code){
    	try {
			String tokenJSONString = getSpecialToken(code);
			JSONObject tokenJSON = JSONObject.fromObject(tokenJSONString);
			String accessToken = tokenJSON.getString("access_token");
			String openid = tokenJSON.getString("openid");
			String userinfo = getUserinfo(accessToken,openid,"zh_CN");
			return userinfo;
		} catch (MalformedURLException e) {
			e.printStackTrace();
			return "MalformedURLException";
		} catch (IOException e) {
			e.printStackTrace();
			return "IOException";
		}
    }
    
    /**
     * @param token 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
     * @param openid 用户的唯一标识
     * @param lang 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
     * @return
     */
    public String getUserinfo(String token,String openid,String lang){
    	String url = String.format(Constant.USERINFO_API, token,openid,lang);
    	String rs;
		try {
			rs = get(url);
	    	return rs;
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
    }
    
    public static String get(String url) throws MalformedURLException,IOException{
   	 	URL getUrl = new URL(url); 
        // 根据拼凑的URL，打开连接，URL.openConnection()函数会根据 URL的类型，返回不同的URLConnection子类的对象，在这里我们的URL是一个http，因此它实际上返回的是HttpURLConnection 
	
        HttpURLConnection connection = (HttpURLConnection) getUrl.openConnection(); 
        // 建立与服务器的连接，并未发送数据 
        connection.setConnectTimeout(10000);

        String lines="";

        boolean retry=true;
        int retryCnt=0;
        while(retry){
        	if(retryCnt>=5)break;
        	try{
        		connection.connect();
                // 发送数据到服务器并使用Reader读取返回的数据 
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"UTF-8")); 
                lines = reader.readLine(); 
                reader.close(); 

                // 断开连接 
                connection.disconnect(); 
                
            	retry=false;
        	}catch(Exception ex){
        		ex.printStackTrace();
        		System.out.println("重试..."+retryCnt);
        		retryCnt=retryCnt+1;
        	}
        }
        
		return lines;
   }
    /**
     * 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid）
     */
    public static String SCOPE_BASE="snsapi_base";
    /**
     * snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
     */
    public static String SCOPE_USERINFO="snsapi_userinfo";
    
    /**
     * 
     * @param url 回调地址
     * @param state 回调地址附加参数state的值
     * @param scope snsapi_base或者snsapi_userinfo
     * @return 生成出微信上授权的地址
     */
    public String genUrl(String url,String state,String scope){
    	try {
			return new String().format(Constant.GENURL_API, this.appid,URLEncoder.encode(url,"utf-8"),scope,state);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
    	return null;
    }
    
    /**
     * 获取统一下单接口prepayId
     * @param product 商品
     * @param openid 微信用户对应的opinid
     * @return
     */
    public  String getPrepayID(Product product,String openid){
    	String entity = PayUtil.genProductArgs(product, openid, this.appid, this.mch_id, this.app_key);
    	byte[] buf = Util.httpPost(Constant.UNIFIEDORDER_API, entity);
        String content = null;
		content = new String(buf,Charset.forName("utf-8"));
    	return content;
    }
    
    /**
     * 获得H5页面调起支付接口参数
     * @param product 商品
     * @param openid 微信用户对应的opinid
     * @return JSONObject 
     */
    public JSONObject getPayJson(Product product,String openid){
    	String prepayIdStr = getPrepayID(product, openid);
    	JSONObject r = new JSONObject();
    	r.put("state", false);
    	try {
			JSONObject j =  JSONObject.fromObject(XML.toJSONObject(prepayIdStr).toString());
			JSONObject j1 = j.getJSONObject("xml");
			if(j1.getString("return_code").equals("SUCCESS")&&j1.getString("result_code").equals("SUCCESS")){
				Long timestamp = System.currentTimeMillis();
		    	String nonceStr = PayUtil.genNonceStr();
		    	String prepayId = "prepay_id="+j1.getString("prepay_id");
		    	String signType = "MD5";
		    	String signUrl = "appId="+this.appid+"&nonceStr="+nonceStr+"&package="+prepayId+"&signType="+signType+"&timeStamp="+timestamp+"&key="+this.app_key;
		    	String paySign = PayUtil.genPaySign(signUrl);
		    	r.put("state", true);
		    	r.put("timestamp", timestamp);
		    	r.put("nonceStr", nonceStr);
		    	r.put("package", prepayId);
		    	r.put("signType", signType);
		    	r.put("paySign", paySign);
			}else{
				r.put("state", false);
				r.put("data", j1.toString());
			}
			return r;
		} catch (JSONException e) {
			e.printStackTrace();
		}
    	return r;
    }
    
    /**
     * 发送红包接口
     * @param redPack
     * @param openid
     * @return
     */
    public String sendRedPack(RedPack redPack, String openid){
    	String entity = PayUtil.genRedPackSign(redPack, openid, this.appid, this.mch_id, this.app_key);
    	try {
			String rs = Util.sendPost(Constant.SENDREDPACK_API, entity);
			JSONObject j =  JSONObject.fromObject(XML.toJSONObject(rs).toString());
			return j.toString();
		} catch (UnrecoverableKeyException e) {
			e.printStackTrace();
		} catch (KeyManagementException e) {
			e.printStackTrace();
		} catch (KeyStoreException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		}
    	return "";
    }
    
    /**
     * 发送消息模板 
     * @param sendValue
     * @param openid
     * @param url
     * @param templateId 查看 https://mp.weixin.qq.com/advanced/tmplmsg?action=list&t=tmplmsg/list&token=741952949&lang=zh_CN
     * @return
     */
    public String send(SendValue sendValue,String openid,String url,String templateId){
    	SendReqData reqData = new SendReqData();
    	reqData.setData(sendValue);
    	reqData.setTopcolor("#FF0000");
    	reqData.setTouser(openid);
    	reqData.setTemplate_id(templateId);
    	reqData.setUrl(url);
    	JSONObject reqJsonData = JSONObject.fromObject(reqData);
    	//System.err.println(reqJsonData);
    	String rs="";
    	try {
			String sendUrl = new String().format(Constant.SEND_API, this.getToken());
			byte[] buf = Util.httpPost(sendUrl, reqJsonData.toString());
			rs =  new String(buf,Charset.forName("utf-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
    	return rs;
    }
   
    /**
     * 检验授权凭证（access_token）是否有效
     * @param access_token 网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
     * @param openid 用户的唯一标识
     * @return
     */
    public JSONObject auhtToken(String access_token,String openid){
	    	String url = new String().format(Constant.AUTH_API,access_token,openid);
	        URL getUrl;
			try {
				getUrl = new URL(url);
		        // 根据拼凑的URL，打开连接，URL.openConnection()函数会根据 URL的类型，返回不同的URLConnection子类的对象，在这里我们的URL是一个http，因此它实际上返回的是HttpURLConnection 
		        HttpURLConnection connection = (HttpURLConnection) getUrl.openConnection(); 
		        // 建立与服务器的连接，并未发送数据 
		
		        connection.connect(); 
		        // 发送数据到服务器并使用Reader读取返回的数据 
		
		        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream())); 
		
		        String lines = reader.readLine(); 
		
		        reader.close(); 
		        // 断开连接 
		        connection.disconnect(); 
		        
		        return JSONObject.fromObject(lines);
			} catch (MalformedURLException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} 
			return null;
    }
    
   
}
