package com.moleus.web.dao.persistence;

import java.io.Serializable;

public interface GenericDao<T extends Serializable> {
    T save(T entity);
}
