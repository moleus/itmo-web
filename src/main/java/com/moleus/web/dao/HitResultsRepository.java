package com.moleus.web.dao;

import com.moleus.web.model.HitResult;
import com.moleus.web.model.HitResult_;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Singleton;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;

import java.util.List;

@Log4j2
@LocalBean
@Singleton
public class HitResultsRepository extends AbstractRepository<HitResult> implements HitsProvider {
    public HitResultsRepository() {
        super(HitResult.class);
    }

    @Override
    public List<HitResult> findByUserId(long userId) {
        var userIdCriteria = super.criteriaSelectEqual(userId, HitResult_.userId);
        return super.entityManager.createQuery(userIdCriteria).getResultList();
    }

    @Transactional
    public void removeByUserId(long userId) {
        var userIdCriteria = super.criteriaDeleteEqual(userId, HitResult_.userId);
        super.entityManager.createQuery(userIdCriteria).executeUpdate();
    }
}
