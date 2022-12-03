package com.moleus.web.service.stratagies.auth;

import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ActionStatus;
import com.moleus.web.util.ActionUtil;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateful;
import jakarta.enterprise.context.RequestScoped;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Stateful
@RequestScoped
@LocalBean
public class LogoutAction {
    public ActionResult execute(HttpServletRequest request) {
        request.getSession().invalidate();
        return ActionUtil.statusToResult(ActionStatus.OK);
    }
}
