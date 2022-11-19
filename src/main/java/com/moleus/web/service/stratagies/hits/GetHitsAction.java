package com.moleus.web.service.stratagies.hits;

import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ActionStatus;
import com.moleus.web.service.stratagies.ParametricAction;
import com.moleus.web.service.stratagies.auth.SessionAttributes;
import com.moleus.web.util.ActionUtil;
import com.moleus.web.util.ServletUtil;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateless;
import lombok.extern.log4j.Log4j2;

import java.util.List;

@Stateless
@LocalBean
@Log4j2
public class GetHitsAction extends ParametricAction<String> {
    @Override
    public ActionResult execute() {
        var hits_obj = ServletUtil.getSessionAttribute(SessionAttributes.HIT_RESULTS.getName());
        if (hits_obj instanceof List<?> hits) {
            int version = Integer.parseInt(data);
            return new ActionResult(ActionStatus.OK, ActionUtil.payloadToJson(hits.subList(version, hits.size())));
        }
        throw new IllegalStateException("Session has no hit results list");
    }
}
