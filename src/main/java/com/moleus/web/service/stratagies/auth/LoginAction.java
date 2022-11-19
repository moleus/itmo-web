package com.moleus.web.service.stratagies.auth;

import com.moleus.web.dto.UserDto;
import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ActionStatus;
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
public class LoginAction extends ParametricAction<UserDto> {
    @EJB private AuthManager authManager;

    @Override
    public ActionResult execute() {
        log.info("Processing login");

        authManager.init(data.getUsername(), data.getPassword());

        if (!authManager.satisfiesConstraints()) {
            return ActionUtil.statusToJson(ActionStatus.UNSATISFIED_CONSTRAINTS);
        }
        return ActionUtil.statusToJson(authManager.authenticate());
    }
}
