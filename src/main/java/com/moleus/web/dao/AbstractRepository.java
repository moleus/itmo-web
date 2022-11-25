package com.moleus.web.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.criteria.CriteriaDelete;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public abstract class AbstractRepository<T> implements GenericDao<T> {
    @PersistenceContext
    protected EntityManager entityManager;
    protected Class<T> clazz;

    protected AbstractRepository(Class<T> clazz) {
        this.clazz = clazz;
    }

    @Override
    @Transactional
    public T save(T entity) throws EntityAlreadyExistsException {
        try {
            entityManager.persist(entity);
            entityManager.flush();
            return entity;
        } catch (PersistenceException e) {
            throw new EntityAlreadyExistsException();
        }
    }

    protected <V> CriteriaDelete<T> criteriaDeleteEqual(V value, SingularAttribute<T, V> attribute) {
        var cBuilder = entityManager.getCriteriaBuilder();
        CriteriaDelete<T> q = cBuilder.createCriteriaDelete(clazz);
        Root<T> entity = q.from(clazz);
        return q.where(cBuilder.equal(entity.get(attribute), value));
    }

    protected <V> CriteriaQuery<T> criteriaSelectEqual(V value, SingularAttribute<T, V> attribute) {
        var cBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<T> q = cBuilder.createQuery(clazz);
        Root<T> entity = q.from(clazz);
        return q.select(entity).where(cBuilder.equal(entity.get(attribute), value));
    }
}