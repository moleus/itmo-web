package com.moleus.web.service.areaCheck.shapes;

import com.moleus.web.service.areaCheck.quadrant.Point;
import com.moleus.web.service.areaCheck.quadrant.Quadrant;

public class Circle extends AbstractShape {
    private final float radius;

    public Circle(Quadrant quadrant, float radius) {
        super(quadrant);
        this.radius = radius;
    }

    @Override
    public boolean isInShape(Point point) {
        return super.isInQuadrant(point) &&
            point.x() * point.x() + point.y() * point.y() <= this.radius * this.radius;
    }
}
