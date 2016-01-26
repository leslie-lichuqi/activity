package com.activity.tencent.Utils;

import java.util.Random;

import net.sf.json.JSONObject;

import com.activity.tencent.Entity.BuySuccessSendValue;
import com.activity.tencent.Entity.Product;
import com.activity.tencent.Entity.RedPack;
import com.activity.tencent.Entity.SendData;

public class Main {
	static TencentApi api = TencentApiFactory.getInstance(TencentApiFactory.DXTSERVICE);
	public static void main(String[] args) {
	    try {
	    	//payTest();
	    	//sendTest();
	    	//System.out.println(api.sign("http://www.yuwangtianxia.com:9099/ywtx/impage/act/weixinDemo/pay1.html"));
	    	//System.out.println(api.genUrl("http://21cn.menet.com.cn:8080/activity/wx/auth/authorize.jsp?redirect_uri=http://21cn.menet.com.cn:8080/activity/wx/dragon/index.html", "", TencentApi.SCOPE_BASE));
	    	//System.out.println(api.getToken());
	    	//api.sendRedPack(redPack, openid)
	    	//System.out.println(PayUtil.genNonceStr());6b620aedfa4cf153467265629501dd61
	    	/*RedPack redPack = new RedPack();
	    	redPack.setAct_name("act_name");
	    	redPack.setClient_ip("127.0.0.1");
	    	redPack.setMch_billno("1");
	    	redPack.setRemark("remark");
	    	redPack.setSend_name("send_name");
	    	redPack.setTotal_amount(100);
	    	redPack.setTotal_num(1);
	    	redPack.setWishing("wishing");
	    	String a = api.sendRedPack(redPack, "oqLvit2Iak6aaKEuQtQW6kme-j0U");
	    	JSONObject rs = new JSONObject().fromObject(a).getJSONObject("xml");
	    	System.out.println("SUCCESS".equals(rs.getString("result_code")));
	    	int i = new Random().nextInt(600);
	    	System.out.println(i+200);*/
	    	
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	
	public static void payTest(){
		Product p = new Product();
		p.setBody("body测试");
		p.setAttach("attach");
		p.setDetail("detail");
		p.setNotify_url("http://www.baidu.com");
		Random r = new Random();
		p.setOut_trade_no(String.valueOf(r.nextInt()));
		p.setSpbill_create_ip("127.0.0.1");
		p.setTotal_fee(10);
		//String rs = PayUtil.genProductArgs(p, openid, "wx841b50c45675ad41", "1243749002", "a07dwwlzUfFMYc2OMAfabAu1VZiMoYm4");
		JSONObject rs = api.getPayJson(p, "ovSNet5ijJFk9hHmd-rB1vm0iUTs");
		System.out.println(rs);
	}
	
	public static void sendRedPickTest(){
		RedPack redPack = new RedPack();
		redPack.setAct_name("猜灯谜抢红包活动");
		redPack.setClient_ip("127.0.0.1");
		redPack.setMch_billno(String.valueOf(new Random().nextInt()));
		redPack.setRemark("猜越多得越多，快来抢！");
		redPack.setSend_name("店讯通");
		redPack.setTotal_amount(100);
		redPack.setTotal_num(1);
		redPack.setWishing("感谢您参加猜灯谜活动，祝您元宵节快乐！");
		String rString = api.sendRedPack(redPack, "ovSNetyq4oKJGJ0W-57rZQ1hgiAA");
		System.out.println(rString);
	}
	
	public static void sendTest() {
		BuySuccessSendValue buySuccessSendValue = new BuySuccessSendValue();
		buySuccessSendValue.setName(new SendData("微信数据容灾服务","#173177"));
		buySuccessSendValue.setExpDate(new SendData("2014-09-12","#173177"));
		buySuccessSendValue.setNumber(new SendData("1","#173177"));
		buySuccessSendValue.setProductType(new SendData("商品名", "#173177"));
		buySuccessSendValue.setRemark(new SendData("如有疑问，请致电13912345678联系我们，或回复M来了解详情。","#173177"));
		String j1 = api.send(buySuccessSendValue, "ovSNet5ijJFk9hHmd-rB1vm0iUTs", "http://www.yuwangtianxia.com",Constant.BUYSUCCESS_TEMPLALE_ID);
		System.out.println(j1);
	}
}
