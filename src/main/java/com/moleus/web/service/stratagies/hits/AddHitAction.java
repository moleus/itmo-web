package com.moleus.web.service.stratagies.hits;

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
import com.moleus.web.service.stratagies.auth.UserProvider;
import com.moleus.web.util.ActionUtil;
import jakarta.ejb.EJB;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateful;
import jakarta.enterprise.context.RequestScoped;
import lombok.extern.log4j.Log4j2;

import java.util.Date;

@Log4j2
@Stateful
@LocalBean
@RequestScoped
public class AddHitAction implements ParametricAction<HitCoordinatesDto> {
    @EJB private HitResultsRepository hitResultsRepository;
    @EJB private Graph shapesGraph;
    @EJB private UserProvider userProvider;

    private Date requestDate;
    private long requestNano;

    @Override
    public ActionResult execute(HitCoordinatesDto coordinatesDto) {
        this.requestDate = new Date();
        this.requestNano = System.nanoTime();

        try {
            var hitResult = prepareHitResult(coordinatesDto);
            hitResultsRepository.save(hitResult);
            HitResultDto payload = HitResultMapper.INSTANCE.toDto(hitResult);
            return new ActionResult(ActionStatus.OK, ActionUtil.payloadToJson(payload));
        } catch (NumberFormatException | NullPointerException e) {
            log.error("Failed to parse params {} with error {}", coordinatesDto, e.getMessage());
            return ActionUtil.statusToJson(ActionStatus.INVALID_PARAMS);
        }
    }

    private HitResult prepareHitResult(HitCoordinatesDto coordinates) {
        HitResultDto hitInfo = parseCoordinates(coordinates);
        calculateHit(hitInfo);
        HitResult hitResult = HitResultMapper.INSTANCE.toEntity(hitInfo);
        hitResult.setUserId(userProvider.getCurrentUser().getId());
        return hitResult;
    }

    private HitResultDto parseCoordinates(HitCoordinatesDto coordinates) {
        HitResultDto hitInfo = new HitResultDto();
        hitInfo.setX(coordinates.getX());
        hitInfo.setY(coordinates.getY());
        hitInfo.setR(coordinates.getR());
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
