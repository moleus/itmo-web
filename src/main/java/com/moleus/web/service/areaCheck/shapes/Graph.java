package com.moleus.web.service.areaCheck.shapes;

import com.moleus.web.service.areaCheck.quadrant.Point;

import java.util.List;

public class Graph {
    private final List<Shape> shapes;

    public Graph(List<Shape> shapes) {
        this.shapes =shapes;
    }

    public boolean isInGraph(Point point) {
        return shapes.stream().anyMatch(shape -> shape.isInShape(point));
    }
}
