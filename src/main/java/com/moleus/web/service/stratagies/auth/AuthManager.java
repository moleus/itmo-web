package com.moleus.web.service.stratagies.auth;

import com.moleus.web.dao.EntityAlreadyExistsException;
import com.moleus.web.dao.UsersRepository;
import com.moleus.web.dto.UserDto;
import com.moleus.web.model.User;
import com.moleus.web.service.stratagies.ActionStatus;
import jakarta.ejb.EJB;
import jakarta.ejb.Stateful;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.security.enterprise.AuthenticationStatus;
import jakarta.security.enterprise.SecurityContext;
import jakarta.security.enterprise.authentication.mechanism.http.AuthenticationParameters;
import jakarta.security.enterprise.credential.Credential;
import jakarta.security.enterprise.credential.UsernamePasswordCredential;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Stateful
@RequestScoped
public class AuthManager implements UserProvider, UserAuthenticator {
    @Inject
    @SuppressWarnings("CdiInjectionPointsInspection")
    private SecurityContext securityContext;
    @EJB
    private UsersRepository usersRepository;

    @Override
    public User getCurrentUser() {
        String username = securityContext.getCallerPrincipal().getName();
        return usersRepository.findByUsername(username).orElseThrow(IllegalStateException::new);
    }

    @Override
    public ActionStatus authenticate(HttpUserCredentials httpUserCredentials) {
        var userDto = httpUserCredentials.userDto();
        Credential credential = new UsernamePasswordCredential(userDto.getUsername(), userDto.getPassword());
        var authParams = AuthenticationParameters.withParams().credential(credential).newAuthentication(true).rememberMe(false);
        AuthenticationStatus authenticate = securityContext.authenticate(httpUserCredentials.request(), httpUserCredentials.response(), authParams);
        if (authenticate.equals(AuthenticationStatus.SUCCESS)) {
            return ActionStatus.OK;
        }
        return ActionStatus.INVALID_CREDENTIALS;
    }

    @Override
    public ActionStatus saveUser(HttpUserCredentials httpUserCredentials) {
        var userDto = httpUserCredentials.userDto();
        if (!satisfiesConstraints(userDto.getUsername(), userDto.getPassword())) {
            return ActionStatus.UNSATISFIED_CONSTRAINTS;
        }
        try {
            log.info("Saved user successfully");
            usersRepository.save(toUser(userDto));
            return this.authenticate(httpUserCredentials);
        } catch (EntityAlreadyExistsException e) {
            log.info("Failed to register. User exists");
            return ActionStatus.USER_EXISTS;
        }
    }

    private User toUser(UserDto userDto) {
        var hashedPassword = PasswordEncryption.encrypt(userDto.getPassword());
        var user = new User();
        user.setUsername(userDto.getUsername());
        user.setPasswordHash(hashedPassword);
        return user;
    }

    private boolean satisfiesConstraints(String username, String password) {
        return checkFieldLength(username, 4) && checkFieldLength(password, 5);
    }

    private boolean checkFieldLength(String field, int lengthConstraint) {
        return field.length() >= lengthConstraint;
    }
}
