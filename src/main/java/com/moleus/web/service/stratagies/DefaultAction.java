package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.service.helpers.ViewPath;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DefaultAction implements Action {
    @Override
    public ViewPath execute(ServletApplicationContext context) {
        return ViewPath.DEFAULT;
    }

    /**
     * Default action must be inapplicable to have the lowest priority.
     */
    @Override
    public boolean isApplicable(String path) {
        return false;
    }
}
