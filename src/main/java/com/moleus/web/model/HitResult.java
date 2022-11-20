package com.moleus.web.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "hit_results")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HitResult implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private long id;
    private long userId;

    private float x;
    private float y;
    private float r;
    private boolean hit;
    private Date hitTime;
    private long executionTimeMicros;
}
