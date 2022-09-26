package com.moleus.web.dao.persistence;

import com.moleus.web.model.HitResult;
import lombok.extern.log4j.Log4j2;

import java.util.List;

@Log4j2
public class HitResultsRepository extends AbstractRepository<HitResult> {
    public HitResultsRepository() {
        super(HitResult.class);
    }

    @Override
    public HitResult save(HitResult entity) {
        super.entityManager.persist(entity);
        return entity;
    }

    public List<HitResult> findByUser(long userId) {
        var userIdCriteria = super.criteriaSelectEqual(this.clazz, userId, "userId");
        return super.entityManager.createQuery(userIdCriteria).getResultList();
    }

    public void removeByUserId(long userId) {
        var userIdCriteria = super.criteriaDeleteEqual(this.clazz, userId, "userId");
        super.entityManager.createQuery(userIdCriteria).executeUpdate();
    }
}
