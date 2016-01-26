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
 * ActImage entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see com.activity.DAO.ActImage
 * @author MyEclipse Persistence Tools
 */
public class ActImageDAO extends BaseHibernateDAO {
	private static final Logger log = LoggerFactory
			.getLogger(ActImageDAO.class);
	// property constants
	public static final String USERID = "userid";
	public static final String USERNAME = "username";
	public static final String TITLE = "title";
	public static final String IMAGEURL = "imageurl";
	public static final String ZONE = "zone";

	public int RecordCount = 0;

	/**
	 * @param pageindex
	 * @param pagesize
	 * @param strWhere
	 * @return
	 */
	public List search(int pageindex, int pagesize, String strWhere) {
		log.debug("finding ActImage instance with condition: " + strWhere);
		getSession().clear();
		try {
			String hql = "select count(*) as count from ActImage as model where 1=1 "
					+ (strWhere == null ? "" : strWhere);
			Query query = getSession().createQuery(hql);
			RecordCount = ((Number) query.iterate().next()).intValue();

			String queryString = "from ActImage as model where 1=1 "
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
	
	public void save(ActImage transientInstance) {
		log.debug("saving ActImage instance");
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

	public void delete(ActImage persistentInstance) {
		log.debug("deleting ActImage instance");
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

	public ActImage findById(java.lang.Integer id) {
		log.debug("getting ActImage instance with id: " + id);
		getSession().clear();
		try {
			ActImage instance = (ActImage) getSession().get(
					"com.activity.DAO.ActImage", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(ActImage instance) {
		log.debug("finding ActImage instance by example");
		getSession().clear();
		try {
			List results = getSession()
					.createCriteria("com.activity.DAO.ActImage")
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
		log.debug("finding ActImage instance with property: " + propertyName
				+ ", value: " + value);
		getSession().clear();
		try {
			String queryString = "from ActImage as model where model."
					+ propertyName + "= ?";
			Query queryObject = getSession().createQuery(queryString);
			queryObject.setParameter(0, value);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByUserid(Object userid) {
		return findByProperty(USERID, userid);
	}

	public List findByUsername(Object username) {
		return findByProperty(USERNAME, username);
	}

	public List findByTitle(Object title) {
		return findByProperty(TITLE, title);
	}

	public List findByImageurl(Object imageurl) {
		return findByProperty(IMAGEURL, imageurl);
	}

	public List findByZone(Object zone) {
		return findByProperty(ZONE, zone);
	}

	public List findAll() {
		log.debug("finding all ActImage instances");
		getSession().clear();
		try {
			String queryString = "from ActImage";
			Query queryObject = getSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public ActImage merge(ActImage detachedInstance) {
		log.debug("merging ActImage instance");
		try {
			ActImage result = (ActImage) getSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(ActImage instance) {
		log.debug("attaching dirty ActImage instance");
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

	public void attachClean(ActImage instance) {
		log.debug("attaching clean ActImage instance");
		try {
			getSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}
}