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
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.util.Date;
import java.util.List;

@Log4j2
@RequestScoped
public class ValidateHitAction extends PathBasedAction {
    private static final ApplicationPath APPLICABLE_PATH = ApplicationPath.UPDATE_HITS;

    @Inject
    private HitResultsRepository hitResultsRepository;
    @Inject
    private Graph shapesGraph;

    private Date requestDate;
    private long requestNano;

    @Override
    public ViewPath execute(ServletApplicationContext context) throws ActionException {
        if (super.isNotLoggedIn()) {
            log.error("User not logged in");
            throw new ActionException(ApplicationPath.UPDATE_HITS, "User not logged in. Session is null");
        }
        this.requestDate = new Date();
        this.requestNano = System.nanoTime();

        // User must be logged in and has session attributes.
        List<HitResult> hitResults = (List<HitResult>) ServletUtil.getSessionAttribute(SessionAttributes.HIT_RESULTS.getName());

        try {
            HitResultDto hitInfo = parseCoordinates();
            calculateHit(hitInfo);
            HitResult hitResult = HitResultMapper.INSTANCE.hitResultDtoToHitResult(hitInfo);
            hitResult.setUserId((long) ServletUtil.getSessionAttribute(SessionAttributes.USER_ID.getName()));
            hitResultsRepository.save(hitResult);
            log.info("Persisted hitResult: {}", hitResult.getId());
            hitResults.add(hitResult);
        } catch (NumberFormatException | NullPointerException e) {
            log.error("Failed to parse params {} with error {}", context.getRequest().getParameterMap().toString(), e.getMessage());
            context.getResponse().setStatus(HttpServletResponse.SC_BAD_REQUEST);
            ServletUtil.setSessionAttribute("errorMessage", e.getMessage());
            return ViewPath.ERROR;
        }

        return ViewPath.HIT_RESULTS;
    }

    @Override
    protected ApplicationPath getProcessPath() {
        return APPLICABLE_PATH;
    }

    private HitResultDto parseCoordinates() {
        HitResultDto hitInfo = new HitResultDto();
        hitInfo.setX(ServletUtil.paramToFloat("paramX"));
        hitInfo.setY(ServletUtil.paramToFloat("paramY"));
        hitInfo.setR(ServletUtil.paramToFloat("paramR"));
        return hitInfo;
    }

    //TODO: separate to the lower abstraction layer
    private void calculateHit(HitResultDto hitInfo) {
        //TODO: adjust coordinates according to R value.
        boolean isHit = this.shapesGraph.isInGraph(new Point(hitInfo.getX() / hitInfo.getR(), hitInfo.getY() / hitInfo.getR()));
        var endTime = System.nanoTime();
        long executionTimeMs = (endTime - requestNano) / 1000;
        hitInfo.setHit(isHit);
        hitInfo.setExecutionTimeMs(executionTimeMs);
        hitInfo.setHitTime(requestDate);
    }
}
