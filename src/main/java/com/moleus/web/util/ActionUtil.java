package com.moleus.web.util;

import com.google.gson.Gson;
import com.moleus.web.dto.ResponsePayload;
import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ActionStatus;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class ActionUtil {
    private static final Gson gson = new Gson();

    public static ActionResult statusToResult(ActionStatus status) {
        return new ActionResult(status, ResponsePayload.fromActionStatus(status));
    }

    public static String toJson(Object obj) {
        return gson.toJson(obj);
    }
}
