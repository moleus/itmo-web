package com.moleus.web.service.stratagies;

import com.moleus.web.dao.HitResultsRepository;
import com.moleus.web.model.HitResult;
import com.moleus.web.service.auth.ProcessStatus;
import com.moleus.web.service.helpers.ActionResult;
import com.moleus.web.service.helpers.SessionAttributes;
import com.moleus.web.util.ActionUtil;
import com.moleus.web.util.ServletUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.ArrayList;

@ApplicationScoped
public class DeleteHitsAction implements Action {
    @Inject
    HitResultsRepository hitResultsRepository;

    @Override
    public ActionResult execute() {
        long userId = (long) ServletUtil.getSessionAttribute(SessionAttributes.USER_ID.getName());
        hitResultsRepository.removeByUserId(userId);
        ServletUtil.setSessionAttribute(SessionAttributes.HIT_RESULTS.getName(), new ArrayList<HitResult>());
        return ActionUtil.statusToJson(ProcessStatus.OK);
    }
}
