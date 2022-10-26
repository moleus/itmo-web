package com.moleus.web.service.stratagies;

import com.moleus.web.dao.UsersRepository;
import com.moleus.web.service.auth.ProcessStatus;
import com.moleus.web.service.helpers.ActionResult;
import com.moleus.web.service.mapping.UserMapper;
import com.moleus.web.util.ActionUtil;
import com.moleus.web.util.ServletUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.log4j.Log4j2;

@Log4j2
@ApplicationScoped
public class GetUserAction implements Action {
    @Inject
    private UsersRepository usersRepository;

    @Override
    public ActionResult execute() {
        String username = ServletUtil.getRequestParameter("username");
        if (username == null) {
            log.error("Unauthorized getUser request");
            return ActionUtil.statusToJson(ProcessStatus.UNAUTHORIZED);
        }
        var user = usersRepository.findByUsername(username).map(UserMapper.INSTANCE::userToDto);
        return user.map(userDto -> new ActionResult(ProcessStatus.OK, ActionUtil.payloadToJson(userDto))).orElseGet(() -> ActionUtil.statusToJson(ProcessStatus.INVALID_PARAMS));
    }
}
