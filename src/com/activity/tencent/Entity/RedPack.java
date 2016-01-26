package com.activity.tencent.Entity;

public class RedPack {
	//商户订单号
	private String mch_billno = "";
	//商户名称
	private String send_name = "";
	//付款金额
	private int total_amount = 0;
	//红包发放总人数
	private int total_num = 1;
	//红包祝福语
	private String wishing = "";
	//Ip地址
	private String client_ip = "";
	//活动名称
	private String act_name = "";
	//备注
	private String remark = "";
	
	public String getMch_billno() {
		return mch_billno;
	}
	/**
	 * 商户订单号
	 * @param mch_billno
	 */
	public void setMch_billno(String mch_billno) {
		this.mch_billno = mch_billno;
	}
	public String getSend_name() {
		return send_name;
	}
	
	/**
	 * 商户名称
	 * @param send_name
	 */
	public void setSend_name(String send_name) {
		this.send_name = send_name;
	}

	public int getTotal_amount() {
		return total_amount;
	}
	
	/**
	 * 付款金额，单位：分
	 * @param total_amount
	 */
	public void setTotal_amount(int total_amount) {
		this.total_amount = total_amount;
	}
	public int getTotal_num() {
		return total_num;
	}
	
	/**
	 * 红包发放总人数
	 * @param total_num
	 */
	public void setTotal_num(int total_num) {
		this.total_num = total_num;
	}
	public String getWishing() {
		return wishing;
	}
	
	/**
	 * 红包祝福语
	 * @param wishing
	 */
	public void setWishing(String wishing) {
		this.wishing = wishing;
	}
	public String getClient_ip() {
		return client_ip;
	}
	
	/**
	 * Ip地址
	 * @param client_ip
	 */
	public void setClient_ip(String client_ip) {
		this.client_ip = client_ip;
	}
	public String getAct_name() {
		return act_name;
	}
	
	/**
	 * 活动名称
	 * @param act_name
	 */
	public void setAct_name(String act_name) {
		this.act_name = act_name;
	}
	public String getRemark() {
		return remark;
	}
	
	/**
	 * 备注
	 * @param remark
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
