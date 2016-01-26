package com.activity.tencent.Entity;


public class BuySuccessSendValue implements SendValue {
	private SendData productType;
	private SendData name;
	private SendData number;
	private SendData expDate;
	private SendData remark;
	
	public SendData getProductType() {
		return productType;
	}
	public void setProductType(SendData productType) {
		this.productType = productType;
	}
	public SendData getName() {
		return name;
	}
	public void setName(SendData name) {
		this.name = name;
	}
	public SendData getNumber() {
		return number;
	}
	public void setNumber(SendData number) {
		this.number = number;
	}
	public SendData getExpDate() {
		return expDate;
	}
	public void setExpDate(SendData expDate) {
		this.expDate = expDate;
	}
	public SendData getRemark() {
		return remark;
	}
	public void setRemark(SendData remark) {
		this.remark = remark;
	}
}
