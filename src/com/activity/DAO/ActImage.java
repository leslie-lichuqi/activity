package com.activity.DAO;

import java.util.Date;

/**
 * ActImage entity. @author MyEclipse Persistence Tools
 */

public class ActImage implements java.io.Serializable {

	// Fields

	private Integer id;
	private Integer userid;
	private String username;
	private String title;
	private String imageurl;
	private String zone;
	private Date createdate;

	// Constructors

	/** default constructor */
	public ActImage() {
	}

	/** minimal constructor */
	public ActImage(Date createdate) {
		this.createdate = createdate;
	}

	/** full constructor */
	public ActImage(Integer userid, String username, String title,
			String imageurl, String zone, Date createdate) {
		this.userid = userid;
		this.username = username;
		this.title = title;
		this.imageurl = imageurl;
		this.zone = zone;
		this.createdate = createdate;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImageurl() {
		return this.imageurl;
	}

	public void setImageurl(String imageurl) {
		this.imageurl = imageurl;
	}

	public String getZone() {
		return this.zone;
	}

	public void setZone(String zone) {
		this.zone = zone;
	}

	public Date getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}

}