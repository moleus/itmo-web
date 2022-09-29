package com.moleus.web.service.stratagies;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.RequestScoped;
import jakarta.enterprise.inject.Instance;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletRequest;


@ApplicationScoped
public class ActionFactory {
    @Inject Instance<Action> actions;

    @Produces
    @RequestScoped
    public Action getActionStrategy(HttpServletRequest request) {
        String signature = request.getMethod() + request.getPathInfo();
        for (Action action : actions) {
            if(action.isApplicable(signature)) {
                return action;
            }
        }
        return actions.select(DefaultAction.class).get();
    }
}
