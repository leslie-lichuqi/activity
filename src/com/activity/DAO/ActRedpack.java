package com.activity.DAO;

import java.util.Date;

/**
 * ActRedpack entity. @author MyEclipse Persistence Tools
 */

public class ActRedpack implements java.io.Serializable {

	// Fields

	private Integer id;
	private String prize;
	private Integer userid;
	private String username;
	private String phone;
	private String openid;
	private String billno;
	private Integer state;
	private Date createdate;

	// Constructors

	/** default constructor */
	public ActRedpack() {
	}

	/** minimal constructor */
	public ActRedpack(String prize, Integer userid, Integer state,
			Date createdate) {
		this.prize = prize;
		this.userid = userid;
		this.state = state;
		this.createdate = createdate;
	}

	/** full constructor */
	public ActRedpack(String prize, Integer userid, String username,
			String phone, String openid, String billno, Integer state,
			Date createdate) {
		this.prize = prize;
		this.userid = userid;
		this.username = username;
		this.phone = phone;
		this.openid = openid;
		this.billno = billno;
		this.state = state;
		this.createdate = createdate;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPrize() {
		return this.prize;
	}

	public void setPrize(String prize) {
		this.prize = prize;
	}

	public Integer getUserid() {
		return this.userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getOpenid() {
		return this.openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getBillno() {
		return this.billno;
	}

	public void setBillno(String billno) {
		this.billno = billno;
	}

	public Integer getState() {
		return this.state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public Date getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}

}