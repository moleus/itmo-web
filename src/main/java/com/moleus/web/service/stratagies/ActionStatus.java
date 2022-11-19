package com.moleus.web.service.stratagies;

public enum ActionStatus {
    OK(200, "Success"),
    USER_EXISTS(200, "User already exists"),
    INVALID_CREDENTIALS(200, "Credentials are invalid"),
    INVALID_PARAMS(200, "Invalid parameters provided"),
    UNSATISFIED_CONSTRAINTS(200, "Login & password should be more than 4 characters long"),
    UNAUTHORIZED(200, "Unauthorized");

    private final int httpCode;
    private final String message;

    ActionStatus(int httpCode, String message) {
        this.httpCode = httpCode;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public int getHttpCode() {
        return httpCode;
    }
}
