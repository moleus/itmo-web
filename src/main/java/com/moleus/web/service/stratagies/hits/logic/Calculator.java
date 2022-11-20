package com.moleus.web.service.stratagies.hits.logic;

public interface Calculator<I, O> {
    O runCalculation(I coordinates);
}
