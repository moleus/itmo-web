package com.moleus.web.service.areaCheck.shapes;

import com.moleus.web.service.areaCheck.quadrant.Point;
import com.moleus.web.service.areaCheck.quadrant.Quadrant;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ShapesTest {
    private final Circle circle = new Circle(Quadrant.SECOND, 0.5f);
    private final Rectangle rectangle = new Rectangle(Quadrant.THIRD, 1f, 1f);
    private final Triangle triangle = new Triangle(Quadrant.FIRST, 1f, 1f);

    @Test
    public void shouldBeTrueInCircle() {
        assertTrue(circle.isInShape(p(0, 0)));
        assertTrue(circle.isInShape(p(-0.5f, 0)));
        assertTrue(circle.isInShape(p(-0.2f, 0.2f)));
    }

    @Test
    public void shouldBeFalseOutsideCircle() {
        assertFalse(circle.isInShape(p(0, 0.6f)));
        assertFalse(circle.isInShape(p(1, 0)));
        assertFalse(circle.isInShape(p(0, -1)));
    }

    @Test
    public void shouldBeTrueInRectangle() {
        assertTrue(rectangle.isInShape(p(-0.5f, 0)));
        assertTrue(rectangle.isInShape(p(-0.9f, -0.9f)));
    }

    @Test
    public void shouldBeFalseOutsideRectangle() {
        assertFalse(rectangle.isInShape(p(0, 0.6f)));
        assertFalse(rectangle.isInShape(p(1, 0)));
        assertFalse(rectangle.isInShape(p(0, -1.1f)));
    }

    @Test
    public void shouldBeTrueInTriangle() {
        assertTrue(triangle.isInShape(p(0.5f, 0.5f)));
        assertTrue(triangle.isInShape(p(1, 0f)));
    }

    @Test
    public void shouldBeFalseOutsideTriangle() {
        assertFalse(triangle.isInShape(p(0.6f, 0.6f)));
        assertFalse(triangle.isInShape(p(0.1f, -0.5f)));
        assertFalse(triangle.isInShape(p(0.1f, 1)));
    }

    private static Point p(float x, float y) {
        return new Point(x, y);
    }
}