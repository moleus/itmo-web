package com.moleus.web.controller;

import com.moleus.web.service.rest.RestManager;
import com.moleus.web.service.stratagies.GetUserAction;
import com.moleus.web.service.stratagies.LoginAction;
import com.moleus.web.service.stratagies.RegisterAction;
import jakarta.inject.Inject;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.util.Objects;
import java.util.regex.Pattern;

@Log4j2
@MultipartConfig
@WebServlet("/api/user/*")
public class UserServlet extends HttpServlet {
    private static final Pattern loginPattern = Pattern.compile("/login");
    private static final Pattern registerPattern = Pattern.compile("/register");
    private static final Pattern getUserPattern = Pattern.compile("/");

    @Inject LoginAction loginAction;
    @Inject RegisterAction registerAction;
    @Inject GetUserAction getUserAction;
    @Inject RestManager restManager;

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        restManager.processAction(getUserAction, request.getPathInfo(), getUserPattern);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        log.info("Processing login form values with pathinfo: {}", request.getPathInfo());
        String path = Objects.requireNonNull(request.getPathInfo(), "/");
        if (registerPattern.matcher(path).matches()) {
            restManager.processAction(registerAction, path, registerPattern);
        } else if (loginPattern.matcher(path).matches()) {
            restManager.processAction(loginAction, path, loginPattern);
        }
    }
}
