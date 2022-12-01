package com.moleus.web.service.areaCheck.shapes;

import com.moleus.web.service.areaCheck.quadrant.Point;
import lombok.extern.log4j.Log4j2;

import java.util.ArrayList;
import java.util.List;

@Log4j2
public class Graph {
    private final List<Shape> shapes = new ArrayList<>();

    public void addShape(Shape shape) {
        shapes.add(shape);
    }

    public boolean isInGraph(Point point) {
        log.info("Shapes size: {}", shapes.size());
        return shapes.stream().anyMatch(shape -> shape.isInShape(point));
    }
}
