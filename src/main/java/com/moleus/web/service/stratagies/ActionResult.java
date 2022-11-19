package com.moleus.web.service.stratagies;

import jakarta.json.JsonValue;

public record ActionResult(ActionStatus status, JsonValue payload) {
}
