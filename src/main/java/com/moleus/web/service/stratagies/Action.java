package com.moleus.web.service.stratagies;

import com.moleus.web.service.helpers.ActionResult;

import java.util.Optional;

/**
 * Implementation represents a service layer of the Web Application
 */
public interface Action {
    /**
     * Implementation should processes a request
     *
     * @return A path to the jsp
     */
    Optional<ActionResult> execute(String[] payload);
}
