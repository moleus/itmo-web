package com.moleus.web.util;

import com.moleus.web.service.stratagies.ActionResult;
import jakarta.ws.rs.core.Response;

public class RestUtil {
    public static Response fromActionResult(ActionResult actionResult) {
        return Response.status(actionResult.status().getHttpCode()).entity(ActionUtil.toJson(actionResult.payload())).build();
    }
}
