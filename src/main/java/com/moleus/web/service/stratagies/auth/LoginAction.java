package com.moleus.web.service.stratagies.auth;

import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ParametricAction;
import com.moleus.web.util.ActionUtil;
import jakarta.ejb.EJB;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateful;
import jakarta.enterprise.context.RequestScoped;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Stateful
@RequestScoped
@LocalBean
public class LoginAction implements ParametricAction<HttpUserCredentials> {
    @EJB private UserAuthenticator authManager;

    @Override
    public ActionResult execute(HttpUserCredentials httpUserCredentials) {
        log.info("Processing login");
        return ActionUtil.statusToResult(authManager.authenticate(httpUserCredentials));
    }
}
