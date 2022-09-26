package com.moleus.web.controller;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

/**
 * Split requests for static resources and for business logic.
 */
@WebFilter(filterName = "MainFilter", urlPatterns = "/*")
public class MainFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        String path = req.getRequestURI().substring(req.getContextPath().length());

        if (path.startsWith("/static")) {
            chain.doFilter(request, response); // Goes to default servlet.
        } else {
            request.getRequestDispatcher("/pages" + path).forward(request, response);
        }
    }
}
