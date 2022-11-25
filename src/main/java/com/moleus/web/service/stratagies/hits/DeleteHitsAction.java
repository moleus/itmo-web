package com.moleus.web.service.stratagies.hits;

import com.moleus.web.dao.HitResultsRepository;
import com.moleus.web.service.stratagies.Action;
import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ActionStatus;
import com.moleus.web.service.stratagies.auth.UserProvider;
import com.moleus.web.util.ActionUtil;
import jakarta.ejb.EJB;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Singleton;

@Singleton
@LocalBean
public class DeleteHitsAction implements Action {
    @EJB private HitResultsRepository hitResultsRepository;
    @EJB private UserProvider userProvider;

    @Override
    public ActionResult execute() {
        long userId = userProvider.getCurrentUser().getId();
        hitResultsRepository.removeByUserId(userId);
        return ActionUtil.statusToResult(ActionStatus.OK);
    }
}
