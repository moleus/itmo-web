package com.moleus.web.controller;

import com.moleus.web.service.helpers.SessionAttributes;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;

import java.io.IOException;

/**
 * Split requests for static resources and for business logic.
 */
@Log4j2
@WebFilter("/*")
public class MainFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        String path = req.getRequestURI().substring(req.getContextPath().length());
        HttpSession session = req.getSession(false);

        boolean unauthorized = session == null || session.getAttribute(SessionAttributes.USER_ID.getName()) == null;

        log.info("New request to {}", path);
        if (unauthorized && !path.equals("/login")) {
            req.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(request, response);
            return;
        }

        if (path.startsWith("/static")) {
            chain.doFilter(request, response); // Goes to default servlet.
        } else {
            request.getRequestDispatcher("/jsp" + path).forward(request, response);
        }
    }
}
