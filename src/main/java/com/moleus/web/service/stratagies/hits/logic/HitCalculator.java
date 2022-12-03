package com.moleus.web.service.stratagies.hits.logic;

import com.moleus.web.dto.HitCoordinatesDto;
import com.moleus.web.model.HitResult;
import com.moleus.web.service.areaCheck.quadrant.Point;
import com.moleus.web.service.areaCheck.shapes.Graph;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Singleton;
import jakarta.inject.Inject;

import java.util.Date;

@LocalBean
@Singleton
public class HitCalculator implements Calculator<HitCoordinatesDto, HitResult> {
    @Inject
    private Graph shapesGraph;

    @Override
    public HitResult runCalculation(HitCoordinatesDto coordinates) {
        var startDate = new Date();
        var startTimeNano = System.nanoTime();
        var hitResult = new HitResult();

        var point = new Point(coordinates.getX(), coordinates.getY());

        boolean isHit = this.shapesGraph.isInGraph(point);
        hitResult.setHit(isHit);

        long executionTimeMicros = (System.nanoTime() - startTimeNano) / 1000;
        hitResult.setX(coordinates.getX());
        hitResult.setY(coordinates.getY());
        hitResult.setR(coordinates.getR());
        hitResult.setExecutionTimeMicros(executionTimeMicros);
        hitResult.setHitTime(startDate);
        return hitResult;
    }
}
