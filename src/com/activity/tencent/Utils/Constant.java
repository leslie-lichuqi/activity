package com.activity.tencent.Utils;

public class Constant {
	 /*
	  * 标点服务器号
	  */
	public static final String APPID = "wxfbf67d72f8c723ec";
	public static final String APPSECRET = "a1af13d7cacd968f25e9e71238aab2a1";
	 //public static final String APPID = "wxdc2e7428a7c129fe";
	 //public static final String APPSECRET = "9705a9a3d5cca706f6da96a200e35f8b";
	 public static final String MCH_ID = "1241164502";//商户平台
     public static final String APP_KEY = "K3stiBUldBYyWK2lvgSIKB4gnzuJrn2G";//商户平台密钥
     public static final String CERTLOCALPATH = "D:\\wx_pay\\21cn\\apiclient_cert.p12"; //HTTPS证书的本地路径
     public static final String CERTPASSWORD = "1241164502";//HTTPS证书密码，默认密码等于商户号MCHID
     
    
     /**
      *  模版消息-购买成功通知模板id
      */
     public static final String BUYSUCCESS_TEMPLALE_ID = "shArKuioraV02TjtVBjxmtKP3Oz2c98s40pqfCs68tg";
     
     public static final String AUTHORIZE_API = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=%s&state=%s#wechat_redirect";
     
     //获取token地址
     public static final String TOKEN_API = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code";
     
     //拉取用户信息地址
     public static final String USERINFO_API = "https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=%s";
     
     //验证openID API地址
     public static final String ACCESSTOKEN_API="https://api.weixin.qq.com/sns/auth?access_token=%s&openid=%s";
     
     public static final String COMMONTOKEN_API = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";
     
     public static final String TICKET_API = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?";
     
     public static final String DOWNLOADMEIDA_API = "http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=%s&media_id=%s";

     public static final String GENURL_API = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=%s&state=%s#wechat_redirect";
     
     public static final String UNIFIEDORDER_API="https://api.mch.weixin.qq.com/pay/unifiedorder";
     
     public static final String SENDREDPACK_API="https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack";
     
     public static final String SEND_API="https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=%s";
     
     public static final String AUTH_API="https://api.weixin.qq.com/sns/auth?access_token=%s&openid=%s";
     
}
