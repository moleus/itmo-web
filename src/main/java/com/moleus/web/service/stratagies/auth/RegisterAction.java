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
public class RegisterAction extends ParametricAction<UserDto> {
    @EJB private AuthManager authManager;

    @Override
    public ActionResult execute() {
        authManager.init(data.getUsername(), data.getPassword());
        if (authManager.satisfiesConstraints()) {
            return processRegister();
        }
        return ActionUtil.statusToJson(ActionStatus.INVALID_CREDENTIALS);
    }

    private ActionResult processRegister() {
        ActionStatus actionStatus = authManager.saveUser();
        return ActionUtil.statusToJson(actionStatus);
    }
}
