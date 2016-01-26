package com.activity.tencent.Utils;

import java.io.IOException;
import java.lang.reflect.Constructor;
import java.util.HashMap;
import java.util.Map;

/**
 * 微信api单体工厂类 返回需要用到的微信公众号
 * @author leslie
 *
 */
public class TencentApiFactory {
	public static final String DXTSERVICE = "dxtfuwu";
	public static final String ANDROIDDXTSERVICE = "androiddxtfuwu";
	
	static TencentApi commonApi = null;
	 
	/**
	 * 生成单例微信API
	 * @param name TencentApiFactory.DXTSERVICE(服务号)
	 * @return
	 */
    public synchronized static TencentApi getInstance(String name) {
        TencentApi api = null;
        if(DXTSERVICE.equals(name)||name==null||"".equals(name)){
        	if(commonApi == null){
        		commonApi = new TencentApi(Constant.APPID,Constant.APPSECRET,Constant.MCH_ID,Constant.APP_KEY) {};
        	}
        	api = commonApi;
        }
        
        return api;
    }
}
