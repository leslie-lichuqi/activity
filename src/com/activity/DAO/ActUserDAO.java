package com.activity.DAO;

import java.util.Date;
import java.util.List;

import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.Transaction;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A data access object (DAO) providing persistence and search support for
 * ActUser entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see com.activity.DAO.ActUser
 * @author MyEclipse Persistence Tools
 */
public class ActUserDAO extends BaseHibernateDAO {
	private static final Logger log = LoggerFactory.getLogger(ActUserDAO.class);
	// property constants
	public static final String USERNAME = "username";
	public static final String PASSWORD = "password";
	public static final String REALNAME = "realname";
	public static final String PHONE = "phone";
	public static final String PROVINCE = "province";
	public static final String ADDRESS = "address";
	public static final String ZIPCODE = "zipcode";
	public static final String IS_STAFF = "isStaff";
	public static final String VOTES = "votes";
	
	public int RecordCount = 0;

	/**
	 * @param pageindex
	 * @param pagesize
	 * @param strWhere
	 * @return
	 */
	public List search(int pageindex, int pagesize, String strWhere) {
		log.debug("finding ActUser instance with condition: " + strWhere);
		getSession().clear();
		try {
			String hql = "select count(*) as count from ActUser as model where 1=1 "
					+ (strWhere == null ? "" : strWhere);
			Query query = getSession().createQuery(hql);
			RecordCount = ((Number) query.iterate().next()).intValue();

			String queryString = "from ActUser as model where 1=1 "
					+ (strWhere == null ? "" : strWhere);
			Query queryObject = getSession().createQuery(queryString);

			if (pageindex == 1) {
				queryObject.setFirstResult(0);
			} else {
				queryObject.setFirstResult((pageindex - 1) * pagesize);
			}
			queryObject.setMaxResults(pagesize);

			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by condition failed", re);
			throw re;
		}
	}
	
	public void save(ActUser transientInstance) {
		log.debug("saving ActUser instance");
		Transaction transaction = getSession().beginTransaction();
		try {
			getSession().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
		transaction.commit();
		getSession().flush();
		getSession().close();
	}

	public void delete(ActUser persistentInstance) {
		log.debug("deleting ActUser instance");
		Transaction transaction = getSession().beginTransaction();
		try {
			getSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
		transaction.commit();
		getSession().flush();
		getSession().close();
	}

	public ActUser findById(java.lang.Integer id) {
		log.debug("getting ActUser instance with id: " + id);
		getSession().clear();
		try {
			ActUser instance = (ActUser) getSession().get(
					"com.activity.DAO.ActUser", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(ActUser instance) {
		log.debug("finding ActUser instance by example");
		getSession().clear();
		try {
			List results = getSession()
					.createCriteria("com.activity.DAO.ActUser")
					.add(Example.create(instance)).list();
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	public List findByProperty(String propertyName, Object value) {
		log.debug("finding ActUser instance with property: " + propertyName
				+ ", value: " + value);
		getSession().clear();
		try {
			String queryString = "from ActUser as model where model."
					+ propertyName + "= ?";
			Query queryObject = getSession().createQuery(queryString);
			queryObject.setParameter(0, value);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByUsername(Object username) {
		return findByProperty(USERNAME, username);
	}

	public List findByPassword(Object password) {
		return findByProperty(PASSWORD, password);
	}

	public List findByRealname(Object realname) {
		return findByProperty(REALNAME, realname);
	}

	public List findByPhone(Object phone) {
		return findByProperty(PHONE, phone);
	}

	public List findByProvince(Object province) {
		return findByProperty(PROVINCE, province);
	}

	public List findByAddress(Object address) {
		return findByProperty(ADDRESS, address);
	}

	public List findByZipcode(Object zipcode) {
		return findByProperty(ZIPCODE, zipcode);
	}

	public List findByIsStaff(Object isStaff) {
		return findByProperty(IS_STAFF, isStaff);
	}

	public List findByVotes(Object votes) {
		return findByProperty(VOTES, votes);
	}

	public List findAll() {
		log.debug("finding all ActUser instances");
		getSession().clear();
		try {
			String queryString = "from ActUser";
			Query queryObject = getSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public ActUser merge(ActUser detachedInstance) {
		log.debug("merging ActUser instance");
		try {
			ActUser result = (ActUser) getSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(ActUser instance) {
		log.debug("attaching dirty ActUser instance");
		Transaction transaction = getSession().beginTransaction();
		try {
			getSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
		transaction.commit();
		getSession().flush();
		getSession().close();
	}

	public void attachClean(ActUser instance) {
		log.debug("attaching clean ActUser instance");
		
		try {
			getSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}
}