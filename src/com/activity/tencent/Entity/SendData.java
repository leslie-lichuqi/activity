package com.activity.tencent.Entity;

public class SendData {
	private String value;
	private String color;
	
	public SendData(String value, String color) {
		this.value = value;
		this.color = color;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	
	
}
