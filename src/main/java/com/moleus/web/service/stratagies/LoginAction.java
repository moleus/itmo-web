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

import java.nio.charset.StandardCharsets;
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
        log.info("Processing login");
        if (!super.isNotLoggedIn()) {
            return ViewPath.HOME;
        }
        log.info("User not logged in");

        String username = ServletUtil.getRequestParameter("username");
        String rawPassword = ServletUtil.getRequestParameter("password");
        if (!checkCredentialsValidity(username, rawPassword)) {
            log.info("Invalid login data; reenter");
            return ViewPath.LOGIN;
        }

        Optional<User> user = usersRepository.findByUsername(username);
        if (user.isPresent()) {
            return processLogin(user.get(), rawPassword);
        }

        return processRegister(username, rawPassword);
    }

    @Override
    protected ApplicationPath getProcessPath() {
        return APPLICABLE_PATH;
    }

    private ViewPath processRegister(String username, String providedPassword) {
        log.info("Registeing new user: {}", username);
        var hashedPassword = PasswordEncryption.encrypt(providedPassword);
        var user = new User();
        user.setUsername(username);
        user.setPasswordHash(hashedPassword);
        usersRepository.save(user);
        setSessionAttributes(user.getId());
        return ViewPath.HOME;
    }

    private boolean checkCredentialsValidity(String username, String password) {
        log.info("Username: {}; password: {}", username, password);
        if (username.length() < 4) {
            setError("Username should be longer than 4 symbols", HttpServletResponse.SC_BAD_REQUEST);
            return false;
        }
        if (password.length() < 4) {
            setError("Password should be longer than 4 symbols", HttpServletResponse.SC_BAD_REQUEST);
            return false;
        }
        return true;
    }

    private ViewPath processLogin(User user, String rawPassword) {
        if (PasswordEncryption.isValid(rawPassword.getBytes(StandardCharsets.UTF_8), user.getPasswordHash())) {
            setSessionAttributes(user.getId());
            log.info("Login successful");
            return ViewPath.HOME;
        }
        setError("Invalid Login or Password", HttpServletResponse.SC_UNAUTHORIZED);
        return ViewPath.LOGIN;
    }

    private void setError(String message, int responseStatus) {
        log.info("error occurred while login: {}", message);
        ServletApplicationContext.getCurrentInstance().getResponse().setStatus(responseStatus);
        ServletApplicationContext.getCurrentInstance().getRequest().setAttribute("errorMessage", message);
    }

    private void setSessionAttributes(long userId) {
        List<HitResult> hitResults = this.hitResultsRepository.findByUser(userId);
        ServletUtil.setSessionAttribute(SessionAttributes.USER_ID.getName(), userId);
        ServletUtil.setSessionAttribute(SessionAttributes.HIT_RESULTS.getName(), hitResults);
    }
}
