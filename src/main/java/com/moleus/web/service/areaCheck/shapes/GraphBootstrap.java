package com.moleus.web.service.areaCheck.shapes;

import com.moleus.web.service.areaCheck.quadrant.Quadrant;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;


@ApplicationScoped
public class GraphBootstrap {
    @Produces
    @ApplicationScoped
    public Graph getShapesGraph() {
        Graph graph = new Graph();
        graph.addShape(new Rectangle(Quadrant.FIRST, 1, 1));
        graph.addShape(new Circle(Quadrant.FIRST, 0.5f));
        graph.addShape(new Rectangle(Quadrant.FIRST, 1, 1));
        return graph;
    }
}
