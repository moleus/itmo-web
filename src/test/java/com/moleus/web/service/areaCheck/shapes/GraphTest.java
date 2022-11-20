package com.moleus.web.service.areaCheck.shapes;

import com.moleus.web.service.areaCheck.quadrant.Point;
import com.moleus.web.service.areaCheck.quadrant.Quadrant;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.WARN)
class GraphTest {
    private static Graph graph;

    @Mock
    private Shape shape;

    @BeforeAll
    public static void setUp() {
        graph = new Graph();
        graph.addShape(new Rectangle(Quadrant.FIRST, 1, 1));
    }

    @Test
    public void shouldReturnTrue_whenShapeContainsPoint() {
        var point = new Point(0, 0);
        when(shape.isInShape(point)).thenReturn(true);

        assertTrue(graph.isInGraph(point));
    }
}