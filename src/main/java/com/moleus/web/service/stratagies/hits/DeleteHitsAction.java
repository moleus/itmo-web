package com.moleus.web.service.stratagies.hits;

import com.moleus.web.dao.HitResultsRepository;
import com.moleus.web.model.HitResult;
import com.moleus.web.service.stratagies.Action;
import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ActionStatus;
import com.moleus.web.service.stratagies.auth.SessionAttributes;
import com.moleus.web.util.ActionUtil;
import com.moleus.web.util.ServletUtil;
import jakarta.ejb.EJB;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Singleton;

import java.util.ArrayList;

@Singleton
@LocalBean
public class DeleteHitsAction implements Action {
    @EJB HitResultsRepository hitResultsRepository;

    @Override
    public ActionResult execute() {
        long userId = (long) ServletUtil.getSessionAttribute(SessionAttributes.USER_ID.getName());
        hitResultsRepository.removeByUserId(userId);
        ServletUtil.setSessionAttribute(SessionAttributes.HIT_RESULTS.getName(), new ArrayList<HitResult>());
        return ActionUtil.statusToJson(ActionStatus.OK);
    }
}
