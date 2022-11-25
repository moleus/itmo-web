package com.moleus.web.dto;

import com.moleus.web.service.stratagies.ActionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ResponsePayload {
    private String errorMessage;
    private boolean isError;
    private Object data;

    public static ResponsePayload fromActionStatus(ActionStatus status) {
        return new ResponsePayload(status.getMessage(), status != ActionStatus.OK, null);
    }

    public static ResponsePayload okWithPayload(Object payload) {
       return new ResponsePayload("", false, payload);
    }

    public static ResponsePayload setError(String errorMessage) {
        return new ResponsePayload(errorMessage, true, null);
    }
}
