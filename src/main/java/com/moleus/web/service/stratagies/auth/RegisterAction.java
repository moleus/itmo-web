package com.moleus.web.service.stratagies.auth;

import com.moleus.web.dto.ResponsePayload;
import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ParametricAction;
import jakarta.ejb.EJB;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateful;
import jakarta.enterprise.context.RequestScoped;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Stateful
@RequestScoped
@LocalBean
public class RegisterAction implements ParametricAction<HttpUserCredentials> {
    @EJB private UserAuthenticator authManager;

    @Override
    public ActionResult execute(HttpUserCredentials httpUserCredentials) {
        var status = authManager.saveUser(httpUserCredentials);
        var payload = ResponsePayload.fromActionStatus(status);
        payload.setData(httpUserCredentials.userDto().getUsername());
        return new ActionResult(status, payload);
    }
}
