package com.moleus.web.service.stratagies;

import com.moleus.web.service.auth.AuthManager;
import com.moleus.web.service.auth.ProcessStatus;
import com.moleus.web.service.helpers.ActionResult;
import com.moleus.web.util.ActionUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.log4j.Log4j2;

@Log4j2
@ApplicationScoped
public class RegisterAction implements Action {
    @Inject
    private AuthManager authManager;

    @Override
    public ActionResult execute() {
        log.info("Processing registration");

        authManager.init();

        if (authManager.satisfiesConstraints()) {
            return processRegister();
        }
        return ActionUtil.statusToJson(ProcessStatus.INVALID_CREDENTIALS);
    }

    private ActionResult processRegister() {
        ProcessStatus processStatus = authManager.saveUser();
        return ActionUtil.statusToJson(processStatus);
    }
}
