package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.dao.HitResultsRepository;
import com.moleus.web.dto.HitResultDto;
import com.moleus.web.model.HitResult;
import com.moleus.web.service.areaCheck.quadrant.Point;
import com.moleus.web.service.areaCheck.shapes.Graph;
import com.moleus.web.service.exceptions.ActionException;
import com.moleus.web.service.helpers.SessionAttributes;
import com.moleus.web.service.helpers.ViewPath;
import com.moleus.web.service.mapping.HitResultMapper;
import com.moleus.web.util.ServletUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.time.LocalDateTime;
import java.util.List;

@Log4j2
@ApplicationScoped
public class ValidateHitAction extends PathBasedAction {
    private static final ApplicationPath APPLICABLE_PATH = ApplicationPath.UPDATE_HITS;

    @Inject
    private HitResultsRepository hitResultsRepository;
    @Inject
    private Graph shapesGraph;

    @Override
    public ViewPath execute(ServletApplicationContext context) throws ActionException {
        if (super.isNotLoggedIn(context)) {
            throw new ActionException(ApplicationPath.UPDATE_HITS, "User not logged in. Session is null");
        }

        // User must be logged in and has session attributes.
        List<HitResult> hitResults = (List<HitResult>) ServletUtil.getSessionAttribute(context, SessionAttributes.HIT_RESULTS.getName());

        try {
            HitResultDto hitInfo = parseCoordinates(context);
            calculateHit(hitInfo);
            HitResult hitResult = HitResultMapper.INSTANCE.hitResultDtoToHitResult(hitInfo);
            hitResults.add(hitResultsRepository.save(hitResult));
            log.info("Persisting hit results: {}", hitResults);
            //TODO: do I need to recreate an object?
            ServletUtil.setSessionAttribute(context, SessionAttributes.HIT_RESULTS.getName(), hitResults);
        } catch (NumberFormatException | NullPointerException e) {
            log.error("Failed to parse params {} with error {}", context.getRequest().getParameterMap().toString(), e.getMessage());
            context.getResponse().setStatus(HttpServletResponse.SC_BAD_REQUEST);
            ServletUtil.setSessionAttribute(context,"errorMessage", e.getMessage());
            return ViewPath.ERROR;
        }

        return ViewPath.HIT_RESULTS;
    }

    @Override
    protected ApplicationPath getProcessPath() {
        return APPLICABLE_PATH;
    }

    private HitResultDto parseCoordinates(ServletApplicationContext context) {
        HitResultDto hitInfo = new HitResultDto();
        hitInfo.setX(ServletUtil.paramToFloat(context, "paramX"));
        hitInfo.setY(ServletUtil.paramToFloat(context, "paramY"));
        hitInfo.setR(ServletUtil.paramToFloat(context, "paramR"));
        return hitInfo;
    }

    //TODO: separate to the lower abstraction layer
    private void calculateHit(HitResultDto hitInfo) {
        var startTime = LocalDateTime.now();
        var endTime = LocalDateTime.now();
        //TODO: adjust coordinates according to R value.
        boolean isHit = this.shapesGraph.isInGraph(new Point(hitInfo.getX(), hitInfo.getY()));
        long executionTime = endTime.getNano() - startTime.getNano();
        hitInfo.setHit(isHit);
        hitInfo.setExecutionTime(executionTime);
        hitInfo.setHitTime(startTime);
        log.info("Calculated hit: {}", hitInfo);
    }
}
