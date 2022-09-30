package com.moleus.web.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public final class ServletApplicationContext implements AutoCloseable {
    private static final ThreadLocal<ServletApplicationContext> instance = new ThreadLocal<>();

    private final HttpServletRequest request;
    private final HttpServletResponse response;

    private ServletApplicationContext(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;
    }

    public static ServletApplicationContext create(HttpServletRequest request, HttpServletResponse response) {
        ServletApplicationContext context = new ServletApplicationContext(request, response);
        instance.set(context);
        return context;
    }

    public static ServletApplicationContext getCurrentInstance() {
        return instance.get();
    }

    @Override
    public void close() {
        instance.remove();
    }

    public HttpServletRequest getRequest() {
        return request;
    }

    public HttpServletResponse getResponse() {
        return response;
    }

    public HttpSession getSession() {
        return request.getSession();
    }

}
