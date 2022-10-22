package com.moleus.web.model;

import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(HitResult.class)
public abstract class HitResult_ {
    public static volatile SingularAttribute<HitResult, Long> userId;
}
