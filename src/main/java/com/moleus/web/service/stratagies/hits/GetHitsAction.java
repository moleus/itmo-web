package com.moleus.web.service.stratagies.hits;

import com.moleus.web.dao.HitResultsRepository;
import com.moleus.web.service.mapping.HitResultMapper;
import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ActionStatus;
import com.moleus.web.service.stratagies.ParametricAction;
import com.moleus.web.service.stratagies.auth.UserProvider;
import com.moleus.web.util.ActionUtil;
import jakarta.ejb.EJB;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateless;
import lombok.extern.log4j.Log4j2;

@Stateless
@LocalBean
@Log4j2
public class GetHitsAction implements ParametricAction<String> {
    @EJB
    private UserProvider userProvider;
    @EJB
    private HitResultsRepository hitsProvider;

    @Override
    public ActionResult execute(String userVersion) {
        var hits = hitsProvider.findByUserId(userProvider.getCurrentUser().getId());
        int version = Integer.parseInt(userVersion);
        var hits_dto_slice = hits.subList(version, hits.size()).stream().map(HitResultMapper.INSTANCE::toDto).toList();
        return new ActionResult(ActionStatus.OK, ActionUtil.payloadToJson(hits_dto_slice));
    }
}
