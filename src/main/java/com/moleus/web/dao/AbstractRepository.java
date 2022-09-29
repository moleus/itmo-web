package com.moleus.web.dao;

import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaDelete;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public abstract class AbstractRepository<T> implements GenericDao<T> {
    @Inject
    protected EntityManager entityManager;
    protected Class<T> clazz;

    public AbstractRepository(Class<T> clazz) {
        this.clazz = clazz;
    }

    @Override
    public T save(T entity) {
        this.entityManager.persist(entity);
        return entity;
    }

    protected CriteriaDelete<T> criteriaDeleteEqual(Object value, String columnName) {
        var cBuilder = this.entityManager.getCriteriaBuilder();
        CriteriaDelete<T> q = cBuilder.createCriteriaDelete(this.clazz);
        Root<T> entity = q.from(this.clazz);
        return q.where(cBuilder.equal(entity.get(columnName), value));
    }

    protected CriteriaQuery<T> criteriaSelectEqual(Object value, String columnName) {
        var cBuilder = this.entityManager.getCriteriaBuilder();
        CriteriaQuery<T> q = cBuilder.createQuery(this.clazz);
        Root<T> entity = q.from(this.clazz);
        return q.select(entity).where(cBuilder.equal(entity.get(columnName), value));
    }
}