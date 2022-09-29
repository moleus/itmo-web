package com.moleus.web.service.helpers;

import at.favre.lib.crypto.bcrypt.BCrypt;

import java.nio.charset.StandardCharsets;

public class PasswordEncryption {
    public static byte[] encrypt(String rawPassword) {
        return BCrypt.withDefaults().hash(12, rawPassword.getBytes(StandardCharsets.UTF_8));
    }
}
