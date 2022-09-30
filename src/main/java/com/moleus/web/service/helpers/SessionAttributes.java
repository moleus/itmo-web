package com.moleus.web.service.helpers;

public enum SessionAttributes {
    USER_ID("userId"),
    HIT_RESULTS("hitResults");

    private final String attributeName;

    SessionAttributes(String attributeName) {
        this.attributeName = attributeName;
    }

    public String getName() {
        return attributeName;
    }
}
