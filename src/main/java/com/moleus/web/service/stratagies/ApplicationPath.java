package com.moleus.web.service.stratagies;

import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.List;

@NoArgsConstructor
public enum ApplicationPath {
    HOME("GET/index", "GET/"),
    UPDATE_HITS("POST/update"),
    RESET_HITS("POST/reset_hits"),
    LOGIN("POST/login");

    private List<String> supportedPaths;

    ApplicationPath(String ... supportedPaths) {
        this.supportedPaths = Arrays.stream(supportedPaths).toList();
    }

    public List<String> getNames() {
        return supportedPaths;
    }
}
