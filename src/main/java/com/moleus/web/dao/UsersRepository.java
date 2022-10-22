package com.moleus.web.dao;

import com.moleus.web.model.User;
import com.moleus.web.model.User_;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;

@ApplicationScoped
public class UsersRepository extends AbstractRepository<User> {
    public UsersRepository() {
        super(User.class);
    }

    public Optional<User> findByUsername(String username) {
        var userNameCriteria = super.criteriaSelectEqual(username, User_.username);
        return super.entityManager.createQuery(userNameCriteria).getResultStream().findFirst();
    }
}
