package com.moleus.web.dao.persistence;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaDelete;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
public abstract class AbstractRepository<T extends Serializable> implements GenericDao<T> {
    @Inject
    protected EntityManager entityManager;
    protected Class<T> clazz;

    public AbstractRepository(Class<T> clazz) {
        this.setClazz(clazz);
    }

    @Override
    abstract public T save(T entity);

    protected final void setClazz(final Class<T> clazzToSet) {
        clazz = clazzToSet;
    }

    protected CriteriaDelete<T> criteriaDeleteEqual(Class<T> clazz, Object value, String columnName) {
        var cBuilder = this.entityManager.getCriteriaBuilder();
        CriteriaDelete<T> q = cBuilder.createCriteriaDelete(clazz);
        Root<T> entity = q.from(clazz);
        return q.where(cBuilder.equal(entity.get(columnName), value));
    }

    protected CriteriaQuery<T> criteriaSelectEqual(Class<T> clazz, Object value, String columnName) {
        var cBuilder = this.entityManager.getCriteriaBuilder();
        CriteriaQuery<T> q = cBuilder.createQuery(clazz);
        Root<T> entity = q.from(clazz);
        return q.select(entity).where(cBuilder.equal(entity.get(columnName), value));
    }
}