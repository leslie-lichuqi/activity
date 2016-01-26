package com.activity.DAO;

import java.util.Date;

/**
 * ActUser entity. @author MyEclipse Persistence Tools
 */

public class ActUser implements java.io.Serializable {

	// Fields

	private Integer id;
	private String username;
	private String password;
	private String realname;
	private String phone;
	private String province;
	private String address;
	private String zipcode;
	private Integer isStaff;
	private Integer votes;
	private String zone;
	private Date createdate;

	// Constructors

	/** default constructor */
	public ActUser() {
	}

	/** minimal constructor */
	public ActUser(String username, String password, Date createdate) {
		this.username = username;
		this.password = password;
		this.createdate = createdate;
	}

	public String getZone() {
		return zone;
	}

	public void setZone(String zone) {
		this.zone = zone;
	}

	/** full constructor */
	public ActUser(String username, String password, String realname,
			String phone, String province, String address, String zipcode,
			Integer isStaff, Integer votes, Date createdate) {
		this.username = username;
		this.password = password;
		this.realname = realname;
		this.phone = phone;
		this.province = province;
		this.address = address;
		this.zipcode = zipcode;
		this.isStaff = isStaff;
		this.votes = votes;
		this.createdate = createdate;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRealname() {
		return this.realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getProvince() {
		return this.province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getZipcode() {
		return this.zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public Integer getIsStaff() {
		return this.isStaff;
	}

	public void setIsStaff(Integer isStaff) {
		this.isStaff = isStaff;
	}

	public Integer getVotes() {
		return this.votes;
	}

	public void setVotes(Integer votes) {
		this.votes = votes;
	}

	public Date getCreatedate() {
		return this.createdate;
	}

	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}

}