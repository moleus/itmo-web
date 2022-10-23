package com.moleus.web.controller;

import jakarta.servlet.RequestDispatcher;
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
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        processRequest(request, response);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String forwardPath = request.getPathInfo().substring(1);
        log.info("Controller servlet processing: {}", forwardPath);
        request.getRequestDispatcher("/WEB-INF/jsp/" + forwardPath + ".jsp").forward(request, response);
    }
}