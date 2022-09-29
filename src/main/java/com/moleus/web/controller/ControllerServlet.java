package com.moleus.web.controller;

import com.moleus.web.service.exceptions.ActionException;
import com.moleus.web.service.helpers.ViewPath;
import com.moleus.web.service.stratagies.Action;
import com.moleus.web.service.stratagies.ActionFactory;
import jakarta.inject.Inject;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.io.IOException;

/**
 * Main class of the Front controller design pattern.
 * <p> Application model:
 * <p>  HTML/JSP -> preview layer
 * <p>  Servlet & Controller classes (front controller, DTO <-> Entity) -> Controller layer
 * <p>  Actions (business logic, validation) -> Service layer
 * <p>  Repository, Entities, hibernate -> DAO Layer
 */
@Log4j2
@WebServlet(name = "FrontController", urlPatterns = "/jsp/*")
@MultipartConfig
public class ControllerServlet extends HttpServlet {
    @Inject ActionFactory actionFactory;

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        processRequest(request, response);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Action action = actionFactory.getActionStrategy(request);
        System.out.println("GET path: " + request);
        try (ServletApplicationContext context = ServletApplicationContext.create(request, response)) {
            runAction(context, action);
        } catch (ActionException e) {
            log.error(e.getMessage());
        }
    }

    private void runAction(ServletApplicationContext context, Action action) throws ActionException, IOException, ServletException {
        ViewPath view = action.execute(context);
        String forwardPath = view.equals(ViewPath.DEFAULT) ? context.getRequest().getPathInfo() : view.getName();
        HttpServletRequest request = context.getRequest();
        HttpServletResponse response = context.getResponse();

        //TODO: remove debug output
        log.info("Forwarding request after action processing to /WEB-INF/jsp/{}.jsp", forwardPath);
        request.getRequestDispatcher("/WEB-INF/jsp/" + forwardPath + ".jsp").forward(request, response);
    }

    public void destroy() {
    }
}