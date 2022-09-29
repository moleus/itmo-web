package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.dao.HitResultsRepository;
import com.moleus.web.dao.UsersRepository;
import com.moleus.web.model.HitResult;
import com.moleus.web.model.User;
import com.moleus.web.service.helpers.PasswordEncryption;
import com.moleus.web.service.helpers.SessionAttributes;
import com.moleus.web.service.helpers.ViewPath;
import com.moleus.web.util.ServletUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.util.List;
import java.util.Optional;

@Log4j2
@ApplicationScoped
public class LoginAction extends PathBasedAction {
    private static final ApplicationPath APPLICABLE_PATH = ApplicationPath.LOGIN;

    @Inject
    private UsersRepository usersRepository;
    @Inject
    private HitResultsRepository hitResultsRepository;

    @Override
    public ViewPath execute(ServletApplicationContext context) {
        if (!isNotLoggedIn(context)) return ViewPath.HOME;

        String username = ServletUtil.getRequestParameter(context, "username");
        String providedPassword = ServletUtil.getRequestParameter(context, "password");
        if (!checkCredentialsValidity(context, username, providedPassword)) {
            return ViewPath.LOGIN;
        }

        byte[] hashedProvidedPass = PasswordEncryption.encrypt(providedPassword);
        Optional<User> user = usersRepository.findByUsername(username);
        if (user.isPresent()) {
            return processLogin(context, user.get(), hashedProvidedPass);
        }

        return processRegister(context, username, hashedProvidedPass);
    }

    @Override
    protected ApplicationPath getProcessPath() {
        return APPLICABLE_PATH;
    }

    private ViewPath processRegister(ServletApplicationContext context, String username, byte[] providedPassword) {
        var user = new User();
        user.setUsername(username);
        user.setPasswordHash(providedPassword);
        this.usersRepository.save(user);
        this.setSessionAttributes(context, user.getId());
        return ViewPath.HOME;
    }

    private boolean checkCredentialsValidity(ServletApplicationContext context, String username, String password) {
        log.info("Username: {}; password: {}", username, password);
        if (username.length() < 4) {
            setError(context, "Username should be longer than 4 symbols", HttpServletResponse.SC_BAD_REQUEST);
            return false;
        }
        if (password.length() < 4) {
            setError(context, "Password should be longer than 4 symbols", HttpServletResponse.SC_BAD_REQUEST);
            return false;
        }
        return true;
    }

    private ViewPath processLogin(ServletApplicationContext context, User user, byte[] hashedProvidedPass) {
        if (user.getPasswordHash() == hashedProvidedPass) {
            this.setSessionAttributes(context, user.getId());
            return ViewPath.HOME;
        }
        setError(context, "Invalid Login or Password", HttpServletResponse.SC_BAD_REQUEST);
        return ViewPath.LOGIN;
    }

    private void setError(ServletApplicationContext context, String message, int responseStatus) {
        context.getResponse().setStatus(responseStatus);
        context.getRequest().setAttribute("errorMessage", message);
    }

    private void setSessionAttributes(ServletApplicationContext context, long userId) {
        List<HitResult> hitResults = this.hitResultsRepository.findByUser(userId);
        ServletUtil.setSessionAttribute(context, SessionAttributes.USER_ID.getName(), userId);
        ServletUtil.setSessionAttribute(context, SessionAttributes.HIT_RESULTS.getName(), hitResults);
    }
}
