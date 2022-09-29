package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.service.exceptions.ActionException;
import com.moleus.web.service.helpers.ViewPath;

/**
 * Implementation represents a service layer of the Web Application
 */
public interface Action {
    /**
     * Implementation should processes a request
     * @return A path to the jsp
     */
    ViewPath execute(ServletApplicationContext context) throws ActionException;

    /**
     * Returns true if the implementation can handle a request to the specified path. Otherwise - returns false.
     */
    boolean isApplicable(String path);
}
