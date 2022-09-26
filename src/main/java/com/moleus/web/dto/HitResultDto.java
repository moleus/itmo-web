package com.moleus.web.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HitResultDto {
    private float x;
    private float y;
    private float r;
    private boolean hit;
    private LocalDateTime hitTime;
    private long executionTime;
}
