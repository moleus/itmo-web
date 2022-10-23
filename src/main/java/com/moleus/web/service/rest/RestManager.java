package com.moleus.web.service.rest;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.service.helpers.ActionResult;
import com.moleus.web.service.stratagies.Action;
import com.moleus.web.util.ActionUtil;
import com.moleus.web.util.RestUtil;
import jakarta.enterprise.context.RequestScoped;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Pattern;

@Log4j2
@RequestScoped
public class RestManager {
    private HttpServletResponse response;

    public void processAction(Action action, String requestPath, Pattern resourcePattern) {
        this.response = ServletApplicationContext.getCurrentInstance().getResponse();

        String nonNullPath = Objects.requireNonNullElse(requestPath, "/");
        Optional<String[]> matchedGroups = RestUtil.getMatch(nonNullPath, resourcePattern);
        if (matchedGroups.isEmpty()) {
            this.pageNotFound();
        } else {
           matchedGroups.flatMap(action::execute).ifPresent(this::sendJson);
        }
    }

    private void pageNotFound() {
       response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    }

    private void sendJson(ActionResult result) {
        try {
            ActionUtil.sendAsJson(response, result);
        } catch (IOException e) {
            log.error("Failed to send response: " + e.getMessage());
        }
    }
}
