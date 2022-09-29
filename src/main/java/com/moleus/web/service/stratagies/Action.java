package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.service.exceptions.ActionException;
import com.moleus.web.service.helpers.ViewPath;

/**
 * Represents Business Model.
 * The main part of the Strategy pattern.
 */
public interface Action {
    ViewPath execute(ServletApplicationContext context) throws ActionException;

    /**
     * Returns true if the implementation can handle a request to the specified path. Otherwise - returns false.
     */
    boolean isApplicable(String path);
}
