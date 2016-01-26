package com.activity.DAO;

import java.util.Date;

/**
 * ActBang entity. @author MyEclipse Persistence Tools
 */

public class ActBang implements java.io.Serializable {

	// Fields

	private Integer id;
	private String bang;
	private Integer userid;
	private String username;
	private Date createdate;
	private String remark;

	// Constructors

	/** default constructor */
	public ActBang() {
	}

	/** minimal constructor */
	public ActBang(String bang, Date createdate) {
		this.bang = bang;
		this.createdate = createdate;
	}

	/** full constructor */
	public ActBang(String bang, Integer userid, String username,
			Date createdate, String remark) {
		this.bang = bang;
		this.userid = userid;
		this.username = username;
		this.createdate = createdate;
		this.remark = remark;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBang() {
		return this.bang;
	}

	public void setBang(String bang) {
		this.bang = bang;
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

	public Date getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}