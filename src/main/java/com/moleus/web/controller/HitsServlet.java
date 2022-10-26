package com.moleus.web.controller;

import com.moleus.web.service.rest.RestManager;
import com.moleus.web.service.stratagies.AddHitAction;
import com.moleus.web.service.stratagies.DeleteHitsAction;
import com.moleus.web.service.stratagies.GetHitsAction;
import jakarta.inject.Inject;
import jakarta.servlet.annotation.HttpConstraint;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.ServletSecurity;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.util.regex.Pattern;

@Log4j2
@MultipartConfig
@ServletSecurity(
    @HttpConstraint(rolesAllowed = "Authorised"))
@WebServlet("/api/hits/*")
public class HitsServlet extends HttpServlet {
    private static final Pattern getHitsPattern = Pattern.compile("/");
    private static final Pattern addHitPattern = Pattern.compile("/add");
    private static final Pattern deleteHitsPattern = Pattern.compile("/");

    @Inject GetHitsAction getHitsAction;
    @Inject AddHitAction addHitAction;
    @Inject DeleteHitsAction deleteHitsAction;
    @Inject RestManager restManager;

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        log.info("Processing GET hits request");
        restManager.processAction(getHitsAction, request.getPathInfo(), getHitsPattern);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        log.info("Processing POST hit request");
        restManager.processAction(addHitAction, request.getPathInfo(), addHitPattern);
    }

    @Override
    public void doDelete(HttpServletRequest request, HttpServletResponse response) {
        log.info("Processing DELETE hit request");
        restManager.processAction(deleteHitsAction, request.getPathInfo(), deleteHitsPattern);
    }
}
