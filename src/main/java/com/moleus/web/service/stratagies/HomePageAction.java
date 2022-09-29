package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.service.exceptions.ActionException;
import com.moleus.web.service.helpers.ViewPath;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HomePageAction extends PathBasedAction {
    private static final ApplicationPath applicationPath = ApplicationPath.DEFAULT;

    @Override
    public ViewPath execute(ServletApplicationContext context) throws ActionException {
        if (super.isNotLoggedIn(context)) {
            throw new ActionException(applicationPath, "User not logged in. Session is null");
        }
        return ViewPath.HOME;
    }

    @Override
    protected ApplicationPath getProcessPath() {
        return applicationPath;
    }
}
