package com.moleus.web.service.areaCheck.shapes;

import com.moleus.web.service.areaCheck.quadrant.Quadrant;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;


@ApplicationScoped
public class GraphBootstrap {
    @Produces @ApplicationScoped
    public Graph getShapesGraph() {
        Graph graph = new Graph();
        graph.addShape(new Circle(Quadrant.FIRST, 0.5f));
        graph.addShape(new Rectangle(Quadrant.SECOND, 1, 1));
        graph.addShape(new Triangle(Quadrant.THIRD, 0.5f, 0.5f));
        return graph;
    }
}
