package com.moleus.web.security;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.security.enterprise.CallerPrincipal;
import jakarta.security.enterprise.credential.RememberMeCredential;
import jakarta.security.enterprise.identitystore.CredentialValidationResult;
import jakarta.security.enterprise.identitystore.RememberMeIdentityStore;

import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
public class TokenMemoryStore implements RememberMeIdentityStore {
    private final Map<String, CredentialValidationResult> store = new ConcurrentHashMap<>();

    @Override
    public CredentialValidationResult validate(RememberMeCredential credential) {
        String token = credential.getToken();
        return store.getOrDefault(token, CredentialValidationResult.INVALID_RESULT);
    }

    @Override
    public String generateLoginToken(CallerPrincipal callerPrincipal, Set<String> groups) {
        String token = UUID.randomUUID().toString();
        store.put(token, new CredentialValidationResult(callerPrincipal, groups));
        return token;
    }

    @Override
    public void removeLoginToken(String token) {
        store.remove(token);
    }
}
