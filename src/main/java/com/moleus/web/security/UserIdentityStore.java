package com.moleus.web.security;

import com.moleus.web.dao.UsersRepository;
import com.moleus.web.model.User;
import com.moleus.web.service.stratagies.auth.PasswordEncryption;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.security.enterprise.credential.UsernamePasswordCredential;
import jakarta.security.enterprise.identitystore.CredentialValidationResult;
import jakarta.security.enterprise.identitystore.IdentityStore;
import lombok.extern.log4j.Log4j2;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Optional;


@Log4j2
@ApplicationScoped
public class UserIdentityStore implements IdentityStore {
    @Inject
    private UsersRepository usersRepository;

    @SuppressWarnings("unused")
    public CredentialValidationResult validate(UsernamePasswordCredential credential) {
        String username = credential.getCaller();
        byte[] providedPass = credential.getPasswordAsString().getBytes(StandardCharsets.UTF_8);
        Optional<User> dbUser = usersRepository.findByUsername(username);

        if (dbUser.isPresent() && PasswordEncryption.isValid(providedPass, dbUser.get().getPasswordHash())) {
            return new CredentialValidationResult(dbUser.get().getUsername(), Collections.singleton("Authorised"));
        }
        return CredentialValidationResult.INVALID_RESULT;
    }
}
