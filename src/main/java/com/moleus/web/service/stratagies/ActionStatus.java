package com.moleus.web.service.stratagies;

public enum ActionStatus {
    OK(200, "Success"),
    USER_EXISTS(401, "User already exists"),
    INVALID_CREDENTIALS(401, "Credentials are invalid"),
    INVALID_PARAMS(400, "Invalid parameters provided"),
    UNSATISFIED_CONSTRAINTS(200, "Login & password should be more than 4 characters long");

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
