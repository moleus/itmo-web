package com.moleus.web.service.areaCheck.shapes;

import com.moleus.web.service.areaCheck.quadrant.Point;
import com.moleus.web.service.areaCheck.quadrant.Quadrant;

public abstract class AbstractShape implements Shape {
    protected final Quadrant quadrant;

    public AbstractShape(Quadrant quadrant) {
        this.quadrant = quadrant;
    }

    @Override
    abstract public boolean isInShape(Point point);

    boolean isInQuadrant(Point point) {
        return this.quadrant.x * point.x() >= 0 && this.quadrant.y * point.y() >= 0;
    }
}
