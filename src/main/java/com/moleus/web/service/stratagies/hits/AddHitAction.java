package com.moleus.web.service.stratagies.hits;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.dao.HitResultsRepository;
import com.moleus.web.dto.HitCoordinatesDto;
import com.moleus.web.dto.HitResultDto;
import com.moleus.web.model.HitResult;
import com.moleus.web.service.areaCheck.quadrant.Point;
import com.moleus.web.service.areaCheck.shapes.Graph;
import com.moleus.web.service.mapping.HitResultMapper;
import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ActionStatus;
import com.moleus.web.service.stratagies.ParametricAction;
import com.moleus.web.service.stratagies.auth.SessionAttributes;
import com.moleus.web.util.ActionUtil;
import com.moleus.web.util.ServletUtil;
import jakarta.ejb.EJB;
import jakarta.ejb.Stateful;
import jakarta.enterprise.context.RequestScoped;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.util.Date;
import java.util.List;

@Log4j2
@Stateful
@RequestScoped
public class AddHitAction extends ParametricAction<HitCoordinatesDto> {
    @EJB private HitResultsRepository hitResultsRepository;
    @EJB private Graph shapesGraph;

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
            return new ActionResult(ActionStatus.OK, ActionUtil.payloadToJson(payload));
        } catch (NumberFormatException | NullPointerException e) {
            log.error("Failed to parse params {} with error {}", data, e.getMessage());
            context.getResponse().setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return ActionUtil.statusToJson(ActionStatus.INVALID_PARAMS);
        }
    }

    private HitResultDto parseCoordinates() {
        HitResultDto hitInfo = new HitResultDto();
        hitInfo.setX(data.getX());
        hitInfo.setY(data.getY());
        hitInfo.setR(data.getR());
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
