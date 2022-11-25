package com.moleus.web.api;

import com.moleus.web.dto.ResponsePayload;
import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ActionStatus;
import com.moleus.web.util.RestUtil;
import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.log4j.Log4j2;

@Provider
@Log4j2
public class PayloadConstraintsExceptionMapper implements ExceptionMapper<ConstraintViolationException> {
    @Override
    public Response toResponse(ConstraintViolationException exception) {
        var violationMessage = exception.getConstraintViolations().stream().toList().get(0).getMessage();
        return RestUtil.fromActionResult(new ActionResult(ActionStatus.OK, ResponsePayload.setError(violationMessage)));
    }
}
