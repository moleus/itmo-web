package com.moleus.web.dto;

import lombok.Data;

import java.util.Date;

@Data
public class HitResultDto {
    private float x;
    private float y;
    private float r;
    private boolean hit;
    private Date hitTime;
    private long executionTimeMs;
}
