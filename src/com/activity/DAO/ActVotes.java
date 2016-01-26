package com.activity.DAO;

import java.util.Date;

/**
 * ActVotes entity. @author MyEclipse Persistence Tools
 */

public class ActVotes implements java.io.Serializable {

	// Fields

	private Integer id;
	private String openid;
	private Integer userid;
	private String username;
	private Date createdate;

	// Constructors

	/** default constructor */
	public ActVotes() {
	}

	/** full constructor */
	public ActVotes(String openid, Integer userid, String username,
			Date createdate) {
		this.openid = openid;
		this.userid = userid;
		this.username = username;
		this.createdate = createdate;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getOpenid() {
		return this.openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
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

}