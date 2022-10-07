package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.service.exceptions.ActionException;
import com.moleus.web.service.helpers.ViewPath;
import jakarta.enterprise.context.RequestScoped;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RequestScoped
public class GetHitsAction extends PathBasedAction {
    private static final ApplicationPath APPLICABLE_PATH = ApplicationPath.GET_HITS;

    @Override
    public ViewPath execute(ServletApplicationContext context) throws ActionException {
        if (super.isNotLoggedIn()) {
            log.error("User not logged in");
            throw new ActionException(ApplicationPath.UPDATE_HITS, "User not logged in. Session is null");
        }
        return ViewPath.HIT_RESULTS;
    }

    @Override
    protected ApplicationPath getProcessPath() {
        return APPLICABLE_PATH;
    }
}
