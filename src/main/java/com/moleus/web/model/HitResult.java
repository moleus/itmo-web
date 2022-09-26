package com.moleus.web.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "hit_results")
@NoArgsConstructor
@AllArgsConstructor
public class HitResult implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private long id;

    @OneToOne
    private User user;
    private float x;
    private float y;
    private float r;
    private boolean hit;
    private LocalDateTime hitTime;
    private long executionTime;
}
