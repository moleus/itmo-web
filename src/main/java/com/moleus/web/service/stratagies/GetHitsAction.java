package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.model.HitResult;
import com.moleus.web.service.helpers.ActionResult;
import com.moleus.web.service.helpers.SessionAttributes;
import com.moleus.web.util.ServletUtil;
import jakarta.enterprise.context.RequestScoped;
import lombok.extern.log4j.Log4j2;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Log4j2
@RequestScoped
public class GetHitsAction implements Action {
    @Override
    public Optional<ActionResult> execute(String[] payload) {
        var hits = (List<HitResult>) ServletUtil.getSessionAttribute(SessionAttributes.HIT_RESULTS.getName());
        int version = Integer.parseInt(Objects.requireNonNullElse(ServletApplicationContext.getCurrentInstance().getRequest().getParameter("version"), "0"));

        return Optional.of(new ActionResult(hits.subList(version, hits.size())));
    }
}