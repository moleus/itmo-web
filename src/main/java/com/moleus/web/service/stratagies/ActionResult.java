package com.moleus.web.service.stratagies;

import com.moleus.web.dto.ResponsePayload;

public record ActionResult(ActionStatus status, ResponsePayload payload) {
}
