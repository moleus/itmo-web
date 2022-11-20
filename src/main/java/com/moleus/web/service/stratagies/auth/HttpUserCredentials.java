package com.moleus.web.service.stratagies.auth;

import com.moleus.web.dto.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public record HttpUserCredentials(UserDto userDto, HttpServletRequest request, HttpServletResponse response) {
}
