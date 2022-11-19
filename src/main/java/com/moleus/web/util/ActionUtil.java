package com.moleus.web.util;

import com.google.gson.Gson;
import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ActionStatus;
import jakarta.json.Json;
import jakarta.json.JsonValue;
import lombok.extern.log4j.Log4j2;

import java.io.StringReader;

@Log4j2
public class ActionUtil {
    private static final Gson gson = new Gson();

    public static JsonValue payloadToJson(Object payload) {
        String jsonedPayload = toJson(payload);
        var jsonReader = Json.createReader(new StringReader(jsonedPayload));
        return jsonReader.read();
    }

    public static ActionResult statusToJson(ActionStatus status) {
        var jsonObjectBuilder = Json.createObjectBuilder().add("message", status.getMessage());
        if (status != ActionStatus.OK) {
            jsonObjectBuilder = jsonObjectBuilder.add("isError", true);
        }
        return new ActionResult(status, jsonObjectBuilder.build());
    }

    private static String toJson(Object obj) {
        return gson.toJson(obj);
    }
}
