package com.moleus.web.service.areaCheck.shapes;

import com.moleus.web.service.areaCheck.quadrant.Point;
import com.moleus.web.service.areaCheck.quadrant.Quadrant;

public class Rectangle extends AbstractShape {
    private final float width;
    private final float height;

    public Rectangle(Quadrant quadrant, float width, float height) {
        super(quadrant);
        this.width = width;
        this.height = height;
    }

    @Override
    public boolean isInShape(Point point) {
        return super.isInQuadrant(point) &&
            this.quadrant.x * point.x() <= this.width && this.quadrant.y * point.y() <= this.height;
    }
}
