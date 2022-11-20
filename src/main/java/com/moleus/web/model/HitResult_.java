package com.moleus.web.model;

import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

import java.util.Date;

@StaticMetamodel(HitResult.class)
public abstract class HitResult_ {
    public static volatile SingularAttribute<HitResult, Long> id;
    public static volatile SingularAttribute<HitResult, Long> userId;
    public static volatile SingularAttribute<HitResult, Float> x;
    public static volatile SingularAttribute<HitResult, Float> y;
    public static volatile SingularAttribute<HitResult, Float> r;
    public static volatile SingularAttribute<HitResult, Boolean> hit;
    public static volatile SingularAttribute<HitResult, Date> hitTime;
    public static volatile SingularAttribute<HitResult, Long> executionTimeMicros;
}
