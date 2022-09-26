package com.moleus.web.service.stratagies;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.RequestScoped;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;


@ApplicationScoped
public class ActionFactory {
    @Inject ValidateHitAction validateHitAction;
    @Inject ResetHitsAction resetHitsAction;
    @Inject HomePageAction homePageAction;

    @Produces
    @RequestScoped
    public Action getActionStrategy(HttpServletRequest request) {
        String signature = request.getMethod() + request.getPathInfo();
        return switch (signature) {
            case "POST/update" -> this.validateHitAction;
            case "POST/reset_hits" -> this.resetHitsAction;
            default -> homePageAction;
        };
    }
}
