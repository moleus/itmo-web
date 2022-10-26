package com.moleus.web.service.helpers;

import com.moleus.web.service.auth.ProcessStatus;
import jakarta.json.JsonValue;

public record ActionResult(ProcessStatus status, JsonValue payload) {
}
