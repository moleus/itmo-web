package com.moleus.web.service.helpers;

public enum ViewPath {
    HOME("index"),
    HIT_RESULTS("hit_results"),
    ERROR("error"),
    LOGIN("login"),

    UNKNOWN("");

    private final String name;

    ViewPath(String path) {
        this.name = path;
    }

    public String getName() {
        return name;
    }
}
