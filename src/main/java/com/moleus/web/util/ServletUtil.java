package com.moleus.web.util;

import com.moleus.web.controller.ServletApplicationContext;

public class ServletUtil {
    public static float paramToFloat(ServletApplicationContext context, String paramName) {
        return Float.parseFloat(getRequestParameter(context, paramName));
    }

    public static Object getSessionAttribute(ServletApplicationContext context, String attrName) {
        return context.getSession().getAttribute(attrName);
    }

    public static void setSessionAttribute(ServletApplicationContext context, String attrName, Object attribute) {
        context.getSession().setAttribute(attrName, attribute);
    }

    public static String getRequestParameter(ServletApplicationContext context, String paramName) {
        return context.getRequest().getParameter(paramName);
    }

}
