package com.moleus.web.service.exceptions;

import com.moleus.web.service.stratagies.ApplicationPath;

public class ActionException extends Exception {
    public ActionException(ApplicationPath requestPath, String message) {
        super("Error occurred while processing path [" + requestPath + "]: " + message);
    }
}
