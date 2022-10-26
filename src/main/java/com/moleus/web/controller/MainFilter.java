package com.moleus.web.controller;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.io.IOException;

/**
 * Logs each request and creates custom context for servlets.
 */
@Log4j2
@WebFilter("/*")
public class MainFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        var req = (HttpServletRequest) request;
        var resp = (HttpServletResponse) response;
        String path = req.getRequestURI().substring(req.getContextPath().length());

        log.info("New request to {}", path);

        try (ServletApplicationContext ignored = ServletApplicationContext.create(req, resp)) {
            chain.doFilter(request, response); // Goes to hits and user servlets
        }
    }
}
