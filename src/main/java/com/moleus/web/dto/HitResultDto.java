package com.moleus.web.dto;

import lombok.Data;

import java.util.Date;

@Data
public class HitResultDto implements GenericDto {
    private long id;
    private float x;
    private float y;
    private float r;
    private boolean hit;
    private Date hitTime;
    private long executionTimeMicros;
}
