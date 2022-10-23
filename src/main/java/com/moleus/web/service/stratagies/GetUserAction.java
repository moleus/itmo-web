package com.moleus.web.service.stratagies;

import com.moleus.web.dao.UsersRepository;
import com.moleus.web.service.helpers.ActionResult;
import com.moleus.web.service.mapping.UserMapper;
import com.moleus.web.util.ServletUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.log4j.Log4j2;

import java.util.Optional;

@Log4j2
@ApplicationScoped
public class GetUserAction implements Action {
    @Inject
    private UsersRepository usersRepository;

    @Override
    public Optional<ActionResult> execute(String[] payload) {
        String username = ServletUtil.getRequestParameter("username");
        if (username == null) {
            log.error("Unauthorized getUser request");
            return Optional.empty();
        }
        return usersRepository.findByUsername(username).map(UserMapper.INSTANCE::userToDto).map(ActionResult::new);
    }
}
