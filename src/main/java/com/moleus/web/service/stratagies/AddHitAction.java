package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.dao.HitResultsRepository;
import com.moleus.web.dto.HitResultDto;
import com.moleus.web.model.HitResult;
import com.moleus.web.service.areaCheck.quadrant.Point;
import com.moleus.web.service.areaCheck.shapes.Graph;
import com.moleus.web.service.auth.ProcessStatus;
import com.moleus.web.service.helpers.ActionResult;
import com.moleus.web.service.helpers.SessionAttributes;
import com.moleus.web.service.mapping.HitResultMapper;
import com.moleus.web.util.ActionUtil;
import com.moleus.web.util.ServletUtil;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.util.Date;
import java.util.List;

@Log4j2
@RequestScoped
public class AddHitAction implements Action {
    @Inject
    private HitResultsRepository hitResultsRepository;
    @Inject
    private Graph shapesGraph;

    private Date requestDate;
    private long requestNano;

    @Override
    public ActionResult execute() {
        this.requestDate = new Date();
        this.requestNano = System.nanoTime();
        ServletApplicationContext context = ServletApplicationContext.getCurrentInstance();

        List<HitResult> hitResults = (List<HitResult>) ServletUtil.getSessionAttribute(SessionAttributes.HIT_RESULTS.getName());

        try {
            HitResultDto hitInfo = parseCoordinates();
            calculateHit(hitInfo);
            HitResult hitResult = HitResultMapper.INSTANCE.toEntity(hitInfo);
            hitResult.setUserId((long) ServletUtil.getSessionAttribute(SessionAttributes.USER_ID.getName()));
            hitResultsRepository.save(hitResult);
            hitResults.add(hitResult);
            HitResultDto payload = HitResultMapper.INSTANCE.toDto(hitResult);
            return new ActionResult(ProcessStatus.OK, ActionUtil.payloadToJson(payload));
        } catch (NumberFormatException | NullPointerException e) {
            log.error("Failed to parse params {} with error {}", context.getRequest().getParameterMap().toString(), e.getMessage());
            context.getResponse().setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return ActionUtil.statusToJson(ProcessStatus.INVALID_PARAMS);
        }
    }

    private HitResultDto parseCoordinates() {
        HitResultDto hitInfo = new HitResultDto();
        hitInfo.setX(ServletUtil.paramToFloat("paramX"));
        hitInfo.setY(ServletUtil.paramToFloat("paramY"));
        hitInfo.setR(ServletUtil.paramToFloat("paramR"));
        return hitInfo;
    }

    private void calculateHit(HitResultDto hitInfo) {
        boolean isHit = this.shapesGraph.isInGraph(new Point(hitInfo.getX() / hitInfo.getR(), hitInfo.getY() / hitInfo.getR()));
        var endTime = System.nanoTime();
        long executionTimeMs = (endTime - requestNano) / 1000;
        hitInfo.setHit(isHit);
        hitInfo.setExecutionTimeMs(executionTimeMs);
        hitInfo.setHitTime(requestDate);
    }
}
