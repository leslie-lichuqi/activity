package com.activity.DAO;

import java.sql.SQLException;
import java.util.List;

import oracle.sql.CLOB;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.lob.SerializableClob;

public class SqlQueryHelper extends BaseHibernateDAO {
	public int RecordCount = 0;
	
	public List sqlQuery(String sql, String[] paramAry) {

		// 返回Object[]的遍历
		Session session = getSession();
		// Transaction transaction = session.beginTransaction();
		SQLQuery s = (SQLQuery) session.createSQLQuery(sql); // .setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP)

		for (int i = 0; i < paramAry.length; i++) {
			// 列名, 数据类型
			s.addScalar(paramAry[i]);
		}
		List rList=s.list();
		session.close();
		return rList;
	}
	
	public List sqlQuery(int pageindex, int pagesize, String sql, String[] paramAry) {

		// 返回Object[]的遍历
		Session session = getSession();
		// Transaction transaction = session.beginTransaction();
		

		String hql = "select count(*) as count from ("+sql+") as model";
		SQLQuery query = (SQLQuery) session.createSQLQuery(hql);

		RecordCount = Integer.valueOf(query.list().get(0).toString());
		
		
		SQLQuery s = (SQLQuery) session.createSQLQuery(sql); // .setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP)

		for (int i = 0; i < paramAry.length; i++) {
			// 列名, 数据类型
			s.addScalar(paramAry[i]);
		}

		if (pageindex == 1) {
			s.setFirstResult(0);
		} else {
			s.setFirstResult((pageindex - 1) * pagesize);
		}
		s.setMaxResults(pagesize);

		List rList=s.list();
		session.close();
		return rList;
	}

	public void sqlExecute(String sql) {
		Session session = getSession();
		Transaction transaction = session.beginTransaction();
		session.createSQLQuery(sql).executeUpdate();
		transaction.commit();
		session.flush();
		session.close();
	}
	
	public static String readClob(Object obj) {
	    try {
	    	SerializableClob clob = (SerializableClob) obj; 
			return clob.getSubString(1, (int) clob.length());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "";
		}  
	}  

}