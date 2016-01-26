package com.activity.tencent.Entity;

public class Product {
	private String body;//商品或支付单简要描述
	private String detail;//商品名称明细列表
	private String attach;//附加数据，在查询API和支付通知中原样返回，该字段主要用于商户携带订单的自定义数据
	private int total_fee;//订单总金额，只能为整数
	private String notify_url;//接收微信支付异步通知回调地址
	private String spbill_create_ip;//APP和网页支付提交用户端ip，Native支付填调用微信支付API的机器IP
	private String out_trade_no;//订单号
	
	public Product() {
		body = "测试";
		detail = "测试";
		attach = "说明";
		total_fee = 0;
		notify_url = "";
		spbill_create_ip = "127.0.0.1";
	}


	public String getOut_trade_no() {
		return out_trade_no;
	}
	
	/**
	 * 订单号
	 * @param out_trade_no
	 */
	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}


	public String getBody() {
		return body;
	}

	/**
	 * 商品或支付单简要描述
	 * @param body
	 */
	public void setBody(String body) {
		this.body = body;
	}

	public String getDetail() {
		return detail;
	}

	/**
	 * 商品名称明细列表
	 * @param detail
	 */
	public void setDetail(String detail) {
		this.detail = detail;
	}

	public String getAttach() {
		return attach;
	}

	/**
	 * 附加数据，在查询API和支付通知中原样返回，该字段主要用于商户携带订单的自定义数据
	 * @param attach
	 */
	public void setAttach(String attach) {
		this.attach = attach;
	}

	public int getTotal_fee() {
		return total_fee;
	}

	/**
	 * 订单总金额，只能为整数
	 * @param total_fee
	 */
	public void setTotal_fee(int total_fee) {
		this.total_fee = total_fee;
	}


	public String getNotify_url() {
		return notify_url;
	}

	/**
	 * 接收微信支付异步通知回调地址
	 * @param notify_url
	 */
	public void setNotify_url(String notify_url) {
		this.notify_url = notify_url;
	}

	public String getSpbill_create_ip() {
		return spbill_create_ip;
	}

	/**
	 * APP和网页支付提交用户端ip，Native支付填调用微信支付API的机器IP
	 * @param spbill_create_ip
	 */
	public void setSpbill_create_ip(String spbill_create_ip) {
		this.spbill_create_ip = spbill_create_ip;
	}
	
}
