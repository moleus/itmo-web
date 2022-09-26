package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.model.HitResult;
import com.moleus.web.dao.persistence.HitResultsRepository;
import com.moleus.web.service.helpers.ViewPath;
import com.moleus.web.util.ServletUtil;
import jakarta.inject.Inject;

import java.util.ArrayList;

public class ResetHitsAction implements Action {
    @Inject
    HitResultsRepository hitResultsRepository;

    @Override
    public ViewPath execute(ServletApplicationContext context) {
        try {
            long userId = ServletUtil.paramToLong(context, "userId");
            hitResultsRepository.removeByUserId(userId);
            context.getSession().setAttribute("hitResults", new ArrayList<HitResult>());
        } catch (NumberFormatException | NullPointerException e) {
            context.getSession().setAttribute("error", e.getMessage());
        }
        return ViewPath.HIT_RESULTS;
    }
}
