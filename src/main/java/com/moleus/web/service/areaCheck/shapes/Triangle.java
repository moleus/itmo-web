package com.moleus.web.service.areaCheck.shapes;

import com.moleus.web.service.areaCheck.quadrant.Point;
import com.moleus.web.service.areaCheck.quadrant.Quadrant;

import static java.lang.Math.abs;

public class Triangle extends AbstractShape {
    private final float a;
    private final float b;

    public Triangle(Quadrant quadrant, float a, float b) {
        super(quadrant);
        this.a = a;
        this.b = b;
    }

    @Override
    public boolean isInShape(Point point) {
        return super.isInQuadrant(point) &&
            -this.a * abs(point.x()) + this.b >= abs(point.y());
    }
}
