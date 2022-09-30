package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.service.helpers.SessionAttributes;

public abstract class PathBasedAction implements Action {
    @Override
    public boolean isApplicable(String requestPath) {
        return Objects.equals(getProcessPath().getName(), requestPath);
    }

    protected abstract ApplicationPath getProcessPath();

    protected boolean isNotLoggedIn() {
        var session = ServletApplicationContext.getCurrentInstance().getRequest().getSession(false);
        return session == null || session.getAttribute(SessionAttributes.USER_ID.getName()) == null;
    }
}
