package com.moleus.web.controller;

import com.moleus.web.service.exceptions.ActionException;
import com.moleus.web.service.stratagies.Action;
import com.moleus.web.service.stratagies.ActionFactory;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * Main class of the Front controller design pattern.
 * <p> Application model:
 * <p>  HTML/JSP -> preview layer
 * <p>  Servlet & Controller classes (front controller, DTO <-> Entity) -> Controller layer
 * <p>  Actions (business logic, validation) -> Service layer
 * <p>  Repository, Entities, hibernate -> DAO Layer
 */
@WebServlet(name = "FrontController", urlPatterns = "/pages/*")
@MultipartConfig
public class ControllerServlet extends HttpServlet {
    @Inject @SessionScoped ActionFactory actionFactory;

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
            throw new RuntimeException("Failed to execute action: " + e.getMessage());
        }
    }

    private void runAction(ServletApplicationContext context, Action action) throws ActionException, IOException, ServletException {
        String view = action.execute(context).toString();
        HttpServletRequest request = context.getRequest();
        HttpServletResponse response = context.getResponse();

        //TODO: remove debug output
        System.out.println("path info: " + view);
        request.getRequestDispatcher("/WEB-INF/jsp/" + view + ".jsp").forward(request, response);
    }

    public void destroy() {
    }
}