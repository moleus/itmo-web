package com.moleus.web.service.stratagies.auth;

import com.moleus.web.service.stratagies.ActionStatus;
import jakarta.ejb.Local;

@Local
public interface UserAuthenticator {
    ActionStatus saveUser(HttpUserCredentials httpUserCredentials);

    ActionStatus authenticate(HttpUserCredentials httpUserCredentials);
}
