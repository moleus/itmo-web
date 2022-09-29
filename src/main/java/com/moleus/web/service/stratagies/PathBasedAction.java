package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;

import java.util.Objects;

public abstract class PathBasedAction implements Action {
    @Override
    public boolean isApplicable(String requestPath) {
        return Objects.equals(getProcessPath().getName(), requestPath);
    }

    protected abstract ApplicationPath getProcessPath();

    protected boolean isNotLoggedIn(ServletApplicationContext context) {
        return context.getRequest().getSession(false) == null;
    }
}
