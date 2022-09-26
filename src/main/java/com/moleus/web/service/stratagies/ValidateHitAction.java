package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.dao.persistence.HitResultsRepository;
import com.moleus.web.dto.HitResultDto;
import com.moleus.web.model.HitResult;
import com.moleus.web.service.helpers.ViewPath;
import com.moleus.web.util.ServletUtil;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Log4j2
public class ValidateHitAction implements Action {
    @Inject
    private HitResultsRepository hitResultsRepository;

    @Override
    public ViewPath execute(ServletApplicationContext context) {
        HttpSession session = context.getSession();

        Long userId = (Long) ServletUtil.getSessionAttribute(context, "userId");
        if (userId == null) {
            context.getResponse().setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            session.setAttribute("errorMessage", "User unauthorized");
            return ViewPath.ERROR;
        }

        List<HitResult> hitResults = ServletUtil.getAttrOrSetDefault(context, "hitResults", new ArrayList<>());
        session.setAttribute("hitResults", hitResults);

        try {
            HitResultDto hitResult = parseCoordinates(context, userId);
            hitResults.add(hitResultsRepository.save(hitResult));
        } catch (NumberFormatException | NullPointerException e) {
            log.error("Failed to parse params {} with error {}", context.getRequest().getParameterMap().toString(), e.getMessage());
            context.getResponse().setStatus(HttpServletResponse.SC_BAD_REQUEST);
            session.setAttribute("errorMessage", e.getMessage());
            return ViewPath.ERROR;
        }

        return ViewPath.HIT_RESULTS;
    }

    private HitResultDto parseCoordinates(ServletApplicationContext context) {
        HitResultDto hitInfo = new HitResultDto();
        hitInfo.setX(ServletUtil.paramToFloat(context, "paramX"));
        hitInfo.setY(ServletUtil.paramToFloat(context, "paramY"));
        hitInfo.setR(ServletUtil.paramToFloat(context, "paramR"));
        return hitInfo;
    }

    private HitResultDto validateParams(HitResultDto hitInfo) {
        //TODO: calculate hit
        boolean isHit = true;
        var startTime = LocalDateTime.now();
        var endTime = LocalDateTime.now();
        long executionTime = endTime.getNano() - startTime.getNano();
        return new HitResult(userId, x, y, r, isHit, startTime, executionTime);
    }
}
