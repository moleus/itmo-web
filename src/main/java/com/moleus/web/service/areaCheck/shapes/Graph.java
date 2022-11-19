package com.moleus.web.service.areaCheck.shapes;

import com.moleus.web.service.areaCheck.quadrant.Point;
import jakarta.ejb.Singleton;

import java.util.ArrayList;
import java.util.List;

@Singleton
public class Graph {
    private final List<Shape> shapes = new ArrayList<>();

    public void addShape(Shape shape) {
        shapes.add(shape);
    }

    public boolean isInGraph(Point point) {
        return shapes.stream().anyMatch(shape -> shape.isInShape(point));
    }
}
