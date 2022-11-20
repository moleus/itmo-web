package com.moleus.web.dao;

import com.moleus.web.model.HitResult;
import jakarta.ejb.Local;

import java.util.List;

@Local
public interface HitsProvider {
    List<HitResult> findByUserId(long userId);
}
