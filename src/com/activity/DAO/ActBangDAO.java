package com.activity.DAO;

import java.util.List;

import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.Transaction;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A data access object (DAO) providing persistence and search support for
 * ActBang entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see com.activity.DAO.ActBang
 * @author MyEclipse Persistence Tools
 */
public class ActBangDAO extends BaseHibernateDAO {
	private static final Logger log = LoggerFactory.getLogger(ActBangDAO.class);
	// property constants
	public static final String BANG = "bang";
	public static final String USERID = "userid";
	public static final String USERNAME = "username";
	
	public int RecordCount = 0;

	/**
	 * @param pageindex
	 * @param pagesize
	 * @param strWhere
	 * @return
	 */
	public List search(int pageindex, int pagesize, String strWhere) {
		log.debug("finding ActBang instance with condition: " + strWhere);
		getSession().clear();
		try {
			String hql = "select count(*) as count from ActBang as model where 1=1 "
					+ (strWhere == null ? "" : strWhere);
			Query query = getSession().createQuery(hql);
			RecordCount = ((Number) query.iterate().next()).intValue();

			String queryString = "from ActBang as model where 1=1 "
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
	public void save(ActBang transientInstance) {
		log.debug("saving ActBang instance");
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

	public void delete(ActBang persistentInstance) {
		log.debug("deleting ActBang instance");
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

	public ActBang findById(java.lang.Integer id) {
		log.debug("getting ActBang instance with id: " + id);
		getSession().clear();
		try {
			ActBang instance = (ActBang) getSession().get(
					"com.activity.DAO.ActBang", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(ActBang instance) {
		log.debug("finding ActBang instance by example");
		getSession().clear();
		try {
			List results = getSession()
					.createCriteria("com.activity.DAO.ActBang")
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
		log.debug("finding ActBang instance with property: " + propertyName
				+ ", value: " + value);
		getSession().clear();
		try {
			String queryString = "from ActBang as model where model."
					+ propertyName + "= ?";
			Query queryObject = getSession().createQuery(queryString);
			queryObject.setParameter(0, value);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByBang(Object bang) {
		return findByProperty(BANG, bang);
	}

	public List findByUserid(Object userid) {
		return findByProperty(USERID, userid);
	}

	public List findByUsername(Object username) {
		return findByProperty(USERNAME, username);
	}

	public List findAll() {
		log.debug("finding all ActBang instances");
		getSession().clear();
		try {
			String queryString = "from ActBang";
			Query queryObject = getSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public ActBang merge(ActBang detachedInstance) {
		log.debug("merging ActBang instance");
		try {
			ActBang result = (ActBang) getSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(ActBang instance) {
		log.debug("attaching dirty ActBang instance");
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

	public void attachClean(ActBang instance) {
		log.debug("attaching clean ActBang instance");
		try {
			getSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}
}