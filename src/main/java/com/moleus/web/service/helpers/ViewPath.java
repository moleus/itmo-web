package com.moleus.web.service.helpers;

public enum ViewPath {
    HOME("index"),
    HIT_RESULTS("hit_results"),
    ERROR("error"),
    LOGIN("login");

    private final String path;

    ViewPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return this.path;
    }
}
