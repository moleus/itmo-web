package com.moleus.web.dao;

import jakarta.ejb.ApplicationException;

@ApplicationException(rollback = true)
public class EntityAlreadyExistsException extends Exception {
    public EntityAlreadyExistsException() {
        super();
    }
}
