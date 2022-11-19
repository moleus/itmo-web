package com.moleus.web.service.stratagies;

import jakarta.ejb.LocalBean;

@LocalBean
public abstract class ParametricAction<T> implements Action {
    protected T data;

    public ActionResult runWithData(T data) {
        this.data = data;
        return execute();
    }
}
