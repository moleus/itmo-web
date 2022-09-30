package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.model.HitResult;
import com.moleus.web.dao.HitResultsRepository;
import com.moleus.web.service.exceptions.ActionException;
import com.moleus.web.service.helpers.SessionAttributes;
import com.moleus.web.service.helpers.ViewPath;
import com.moleus.web.util.ServletUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.ArrayList;

@ApplicationScoped
public class ResetHitsAction extends PathBasedAction {
    private static final ApplicationPath APPLICABLE_PATH = ApplicationPath.RESET_HITS;

    @Inject
    HitResultsRepository hitResultsRepository;

    @Override
    public ViewPath execute(ServletApplicationContext context) throws ActionException {
        if (super.isNotLoggedIn()) {
            throw new ActionException(APPLICABLE_PATH, "User not logged in. Session is null");
        }
        try {
            long userId = (long) ServletUtil.getSessionAttribute(SessionAttributes.USER_ID.getName());
            hitResultsRepository.removeByUserId(userId);
            ServletUtil.setSessionAttribute(SessionAttributes.HIT_RESULTS.getName(), new ArrayList<HitResult>());
        } catch (NumberFormatException | NullPointerException e) {
            context.getRequest().setAttribute("errorMessage", e.getMessage());
        }
        return ViewPath.HIT_RESULTS;
    }

    @Override
    protected ApplicationPath getProcessPath() {
        return APPLICABLE_PATH;
    }
}
