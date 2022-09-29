package com.moleus.web.dao;

import jakarta.enterprise.context.RequestScoped;
import jakarta.enterprise.inject.Disposes;
import jakarta.enterprise.inject.Produces;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;

@RequestScoped
public class EntityManagerProducer {
    @PersistenceUnit
    EntityManagerFactory factory;

    @Produces
    @RequestScoped
    public EntityManager newEntityManager() {
        return factory.createEntityManager();
    }

    public void closeEntityManager(@Disposes EntityManager em) {
        em.close();
    }
}
