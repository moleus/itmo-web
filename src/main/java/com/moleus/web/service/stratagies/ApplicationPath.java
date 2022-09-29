package com.moleus.web.service.stratagies;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public enum ApplicationPath {
    DEFAULT("GET/index"),
    UPDATE_HITS("POST/update"),
    RESET_HITS("POST/reset_hits"),
    LOGIN("POST/login"),
    CHECK("POST/checklogin");

    private String path;

    ApplicationPath(String path) {
        this.path = path;
    }

    public String getName() {
        return path;
    }
}
