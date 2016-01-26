package com.test;

import java.util.Date;

import redis.clients.jedis.Jedis;

import com.activity.DAO.ActUser;
import com.activity.DAO.ActUserDAO;
import com.activity.Utils.redis.RedisUtil;
import com.activity.tencent.Utils.TencentApi;
import com.activity.tencent.Utils.TencentApiFactory;

public class test {
	public static void main(String[] args) {
		TencentApi api = TencentApiFactory.getInstance(TencentApiFactory.DXTSERVICE);
		System.out.println( api.genUrl("http://192.168.1.100:8099/activity/wx/auth/authorize.jsp?redirect_uri=http://192.168.1.100:8099/activity/wx/dragon/index.html", "0", api.SCOPE_BASE));
	}

	private static void testDAO() {
		ActUser u = new ActUser();
		ActUserDAO dao = new ActUserDAO();
		u.setAddress("");
		u.setCreatedate(new Date());
		u.setIsStaff(1);
		u.setPassword("a");
		u.setPhone("1");
		u.setProvince("1");
		u.setRealname("a");
		u.setUsername("测试");
		u.setVotes(1);
		u.setZipcode("1");
		dao.save(u);
	};
}
