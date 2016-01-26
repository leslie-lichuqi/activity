package com.activity.tencent.Utils;

import java.nio.charset.Charset;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;

import org.apache.commons.httpclient.NameValuePair;

import com.activity.tencent.Entity.Product;
import com.activity.tencent.Entity.RedPack;

public class PayUtil {
	 public static String genNonceStr() {
		Random random = new Random();
		return MD5.getMessageDigest(String.valueOf(random.nextInt(10000)).getBytes());
	}
	 
	 /**
	  * 生成调起微信支付签名
	  */
	 public static String genPaySign(String signUrl) {
			return MD5.getMessageDigest(signUrl.toString().getBytes(Charset.forName("utf-8"))).toUpperCase();
		}
	 
	 /**
	 生成签名
	 */
	public static String genPackageSign(List<NameValuePair> params,String key) {
		StringBuffer sb = new StringBuffer();
		
		for (int i = 0; i < params.size(); i++) {
			if(params.get(i).getValue()!=null&&!"".equals(params.get(i).getValue())){
				sb.append(params.get(i).getName());
				sb.append('=');
				sb.append(params.get(i).getValue());
				sb.append('&');
			}
		}
		sb.append("key=");
		sb.append(key);
		//System.out.println("params::"+sb);
		String packageSign="";
		packageSign =  MD5.getMessageDigest(sb.toString().getBytes(Charset.forName("utf-8"))).toUpperCase();
		//System.out.println("sign::"+packageSign);
		return packageSign;
	}
	
	public static String genProductArgs(Product product,String openid,String appId,String mchId,String key) {
		try {
			String nonceStr = genNonceStr();
			//String nonceStr = "43207fd5e34f87c48d584fc5c11befb8";	
			List<NameValuePair> packageParams = new LinkedList<NameValuePair>();
			packageParams.add(new NameValuePair("appid", appId));
			packageParams.add(new NameValuePair("attach",product.getAttach()));
			packageParams.add(new NameValuePair("body",product.getBody()));
			packageParams.add(new NameValuePair("detail",product.getDetail()));
			packageParams.add(new NameValuePair("device_info", "WEB"));
			packageParams.add(new NameValuePair("fee_type","CNY"));
	    	packageParams.add(new NameValuePair("mch_id", mchId));
	    	packageParams.add(new NameValuePair("nonce_str", nonceStr));
	    	packageParams.add(new NameValuePair("notify_url",product.getNotify_url()));
	        packageParams.add(new NameValuePair("openid", openid));
	        packageParams.add(new NameValuePair("out_trade_no",product.getOut_trade_no()));
	        packageParams.add(new NameValuePair("spbill_create_ip",product.getSpbill_create_ip()));
	        packageParams.add(new NameValuePair("total_fee",String.valueOf(product.getTotal_fee())));
	        //packageParams.add(new NameValuePair("nonce_str", nonceStr));
	        //packageParams.add(new NameValuePair("out_trade_no",genOutTradNo()));
	        packageParams.add(new NameValuePair("trade_type", "JSAPI"));

	        packageParams.add(new NameValuePair("sign", genPackageSign(packageParams, key)));
			
	        String xmlstring =toXml(packageParams);

			//return new String(xmlstring.getBytes(),Charset.forName("ISO8859-1"));
	        return xmlstring;
		} catch (Exception e) {
			return null;
		}
	}
	
	
	public static String genRedPackSign(RedPack redPack,String openid,String appId,String mchId,String key){
		try {
			String nonceStr = genNonceStr();
			//String nonceStr = "43207fd5e34f87c48d584fc5c11befb8";	
			List<NameValuePair> packageParams = new LinkedList<NameValuePair>();
			packageParams.add(new NameValuePair("act_name",redPack.getAct_name()));
			packageParams.add(new NameValuePair("client_ip",redPack.getClient_ip()));
			packageParams.add(new NameValuePair("mch_billno",redPack.getMch_billno()));
			packageParams.add(new NameValuePair("mch_id",mchId));
			packageParams.add(new NameValuePair("nonce_str",nonceStr));
			packageParams.add(new NameValuePair("re_openid",openid));
			packageParams.add(new NameValuePair("remark",redPack.getRemark()));
			packageParams.add(new NameValuePair("send_name",redPack.getSend_name()));
			packageParams.add(new NameValuePair("total_amount",String.valueOf(redPack.getTotal_amount())));
			packageParams.add(new NameValuePair("total_num",String.valueOf(redPack.getTotal_num())));
			packageParams.add(new NameValuePair("wishing",redPack.getWishing()));
			packageParams.add(new NameValuePair("wxappid",appId));
			
			packageParams.add(new NameValuePair("sign", genPackageSign(packageParams, key)));
	        String xmlstring =toXml(packageParams);

			//return new String(xmlstring.getBytes(),Charset.forName("ISO8859-1"));
	        return xmlstring;
		} catch (Exception e) {
			return null;
		}
	}
	
	private static String toXml(List<NameValuePair> params) {
		StringBuffer sb = new StringBuffer();
		//sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		sb.append("<xml>");
		for (int i = 0; i < params.size(); i++){
			if(params.get(i).getValue()!=null&&!"".equals(params.get(i).getValue())){
				sb.append("<"+params.get(i).getName()+">");
				sb.append(params.get(i).getValue());
				sb.append("</"+params.get(i).getName()+">");
			}
		}
		sb.append("</xml>");
		return sb.toString();
	}
	
	
}
