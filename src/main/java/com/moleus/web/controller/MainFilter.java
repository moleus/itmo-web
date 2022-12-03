package com.moleus.web.controller;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;

import java.io.IOException;

/**
 * Logs each request.
 */
@Log4j2
@WebFilter("/*")
public class MainFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        var req = (HttpServletRequest) request;
        String path = req.getRequestURI().substring(req.getContextPath().length());

        log.info("New request to {}", path);
        chain.doFilter(request, response);
    }
}
