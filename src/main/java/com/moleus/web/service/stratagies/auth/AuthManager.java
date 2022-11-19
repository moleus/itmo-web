package com.moleus.web.service.stratagies.auth;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.dao.HitResultsRepository;
import com.moleus.web.dao.UsersRepository;
import com.moleus.web.model.HitResult;
import com.moleus.web.model.User;
import com.moleus.web.service.stratagies.ActionStatus;
import com.moleus.web.util.ServletUtil;
import jakarta.ejb.EJB;
import jakarta.ejb.Stateful;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.security.enterprise.AuthenticationStatus;
import jakarta.security.enterprise.SecurityContext;
import jakarta.security.enterprise.authentication.mechanism.http.AuthenticationParameters;
import jakarta.security.enterprise.credential.Credential;
import jakarta.security.enterprise.credential.UsernamePasswordCredential;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.util.List;
import java.util.Optional;

@Log4j2
@Stateful
@RequestScoped
public class AuthManager {
    private String username;
    private String password;
    private HttpServletRequest request;
    private HttpServletResponse response;

    @Inject private SecurityContext securityContext;
    @EJB private UsersRepository usersRepository;
    @EJB private HitResultsRepository hitResultsRepository;

    public void init(String username, String password) {
        this.request = ServletApplicationContext.getCurrentInstance().getRequest();
        this.response = ServletApplicationContext.getCurrentInstance().getResponse();

        this.username = username;
        this.password = password;
    }

    public ActionStatus authenticate() {
        Credential credential = new UsernamePasswordCredential(username, password);
        AuthenticationStatus authenticate = securityContext.authenticate(request, response,
            AuthenticationParameters.withParams()
                .credential(credential)
                .newAuthentication(true)
                .rememberMe(false));
        if (authenticate.equals(AuthenticationStatus.SUCCESS)) {
            setSessionAttributes();
            return ActionStatus.OK;
        }
        return ActionStatus.INVALID_CREDENTIALS;
    }

    public boolean satisfiesConstraints() {
        return checkFieldLength(username, 4) &&
            checkFieldLength(password, 5);
    }

    private boolean checkFieldLength(String field, int lengthConstraint) {
        return field.length() >= lengthConstraint;
    }

    public ActionStatus saveUser() {
        var hashedPassword = PasswordEncryption.encrypt(password);
        var user = new User();
        user.setUsername(username);
        user.setPasswordHash(hashedPassword);
        try {
            log.info("Saved user successfully");
            usersRepository.save(user);
            return this.authenticate();
        } catch (PersistenceException e) {
            log.info("Failed to register. User exists");
            return ActionStatus.USER_EXISTS;
        }
    }

    private void setSessionAttributes() {
        Optional<User> user = usersRepository.findByUsername(username);
        if (user.isPresent()) {
            long userId = user.get().getId();
            List<HitResult> hitResults = this.hitResultsRepository.findByUser(userId);
            ServletUtil.setSessionAttribute(SessionAttributes.USER_ID.getName(), userId);
            ServletUtil.setSessionAttribute(SessionAttributes.HIT_RESULTS.getName(), hitResults);
        }
    }
}
