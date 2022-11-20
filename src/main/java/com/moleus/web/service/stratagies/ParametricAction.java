package com.moleus.web.service.stratagies;

public interface ParametricAction<T> {
    ActionResult execute(T data);
}
