package com.moleus.web.service.areaCheck.shapes;

import com.moleus.web.service.areaCheck.quadrant.Point;

import java.util.ArrayList;
import java.util.List;

public class Graph {
    private final List<Shape> shapes = new ArrayList<>();

    public void addShape(Shape shape) {
        shapes.add(shape);
    }

    public boolean isInGraph(Point point) {
        return shapes.stream().anyMatch(shape -> shape.isInShape(point));
    }
}
