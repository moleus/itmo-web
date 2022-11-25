package com.moleus.web.dao;

public interface GenericDao<T> {
    T save(T entity) throws EntityAlreadyExistsException;
}
