package com.moleus.web.security;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.security.enterprise.AuthenticationStatus;
import jakarta.security.enterprise.authentication.mechanism.http.AutoApplySession;
import jakarta.security.enterprise.authentication.mechanism.http.HttpAuthenticationMechanism;
import jakarta.security.enterprise.authentication.mechanism.http.HttpMessageContext;
import jakarta.security.enterprise.credential.Credential;
import jakarta.security.enterprise.credential.UsernamePasswordCredential;
import jakarta.security.enterprise.identitystore.CredentialValidationResult;
import jakarta.security.enterprise.identitystore.IdentityStoreHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.util.Set;

@Log4j2
@AutoApplySession
@ApplicationScoped
public class CustomAuthentication implements HttpAuthenticationMechanism {
    @Inject
    private IdentityStoreHandler userStoreHandler;

    @Override
    public AuthenticationStatus validateRequest(HttpServletRequest request, HttpServletResponse response, HttpMessageContext httpMsgContext) {
        boolean isAuthRequest = httpMsgContext.isAuthenticationRequest();
        if (isAuthRequest) {
            return authenticate(request, httpMsgContext);
        }
        boolean isProtected = httpMsgContext.isProtected();
        if (isProtected) {
            return checkAuthorized(request, httpMsgContext);
        }
        return httpMsgContext.doNothing();
    }

    private AuthenticationStatus checkAuthorized(HttpServletRequest request, HttpMessageContext httpMessageContext) {
        Set<String> groups = httpMessageContext.getGroups();
        if (groups != null && !groups.isEmpty()) {
            return httpMessageContext.doNothing();
        }
        log.info("Unauthorized request to: {}", request.getRequestURI());
        if (request.getServletPath().startsWith("/api")) {
            return httpMessageContext.responseUnauthorized();
        } else {
            return httpMessageContext.redirect(request.getContextPath() + "/login.jsp");
        }
    }

    private AuthenticationStatus authenticate(HttpServletRequest request, HttpMessageContext httpMessageContext) {
        Credential credential = httpMessageContext.getAuthParameters().getCredential();
        if (credential == null) {
            return httpMessageContext.responseUnauthorized();
        }
        if (!(credential instanceof UsernamePasswordCredential)) {
            return httpMessageContext.doNothing();
        }
        CredentialValidationResult result = userStoreHandler.validate(credential);
        if (result.getStatus() == CredentialValidationResult.Status.VALID) {
            return httpMessageContext.notifyContainerAboutLogin(result);
        } else if (request.getServletPath().startsWith("/api")) {
            return httpMessageContext.responseUnauthorized();
        } else {
            return httpMessageContext.redirect(request.getContextPath() + "/login");
        }
    }
}
