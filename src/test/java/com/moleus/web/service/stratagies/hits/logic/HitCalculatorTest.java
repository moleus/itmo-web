package com.moleus.web.service.stratagies.hits.logic;

import com.moleus.web.dto.HitCoordinatesDto;
import com.moleus.web.model.HitResult;
import com.moleus.web.service.areaCheck.quadrant.Point;
import com.moleus.web.service.areaCheck.shapes.Graph;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.WARN)
class HitCalculatorTest {
    @Mock
    private Graph graph;

    @InjectMocks
    private HitCalculator hitCalculator;

    @Test
    public void shouldFillAllFields() {
        float DEFAULT_X = 0.1f;
        float DEFAULT_Y = 0.2f;
        float DEFAULT_R = 1f;

        var coordinates = new HitCoordinatesDto(DEFAULT_X, DEFAULT_Y, DEFAULT_R);
        var point = new Point(DEFAULT_X/DEFAULT_R, DEFAULT_Y/DEFAULT_R);
        when(graph.isInGraph(point)).thenReturn(true);

        var currentDate = new Date();
        HitResult result = hitCalculator.runCalculation(coordinates);
        assertTrue(result.isHit());
        assertEquals(DEFAULT_X, result.getX(), "result for X is invalid");
        assertEquals(DEFAULT_Y, result.getY(), "result for Y is invalid");
        assertEquals(DEFAULT_R, result.getR(), "result for R is invalid");
        assertThat(result.getHitTime().getTime()-currentDate.getTime()).isBetween(0L, 1L);
        assertThat(result.getExecutionTimeMicros()).isBetween(3L, 100_000L);
    }
}