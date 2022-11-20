package com.moleus.web.service.stratagies.auth;

import com.moleus.web.model.User;
import jakarta.ejb.Local;

@Local
public interface UserProvider {
    User getCurrentUser();
}
