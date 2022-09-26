package com.moleus.web.service.helpers;

public enum ResponseCode {
    OK(200),
    BAD_REQUEST(400),
    UNAUTHORIZED(401),
    NOT_FOUND(404);

    private final int code;

    ResponseCode(int code) {
        this.code = code;
    }
}
