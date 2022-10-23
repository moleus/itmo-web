package com.moleus.web.controller;

import com.moleus.web.service.rest.RestManager;
import com.moleus.web.service.stratagies.GetUserAction;
import com.moleus.web.service.stratagies.LoginAction;
import jakarta.inject.Inject;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.util.regex.Pattern;

@Log4j2
@MultipartConfig
@WebServlet("/user/*")
public class UserServlet extends HttpServlet {
    private static final Pattern loginPattern = Pattern.compile("/login");
    private static final Pattern getUserPattern = Pattern.compile("/");

    @Inject LoginAction loginAction;
    @Inject GetUserAction getUserAction;
    @Inject RestManager restManager;

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        restManager.processAction(getUserAction, request.getPathInfo(), getUserPattern);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        log.info("Processing login form values with pathinfo: {}", request.getPathInfo());
        restManager.processAction(loginAction, request.getPathInfo(), loginPattern);
    }
}
