package com.moleus.web.util;

import com.moleus.web.controller.ServletApplicationContext;

public class ServletUtil {
    public static float paramToFloat(ServletApplicationContext context, String paramName) {
        return Float.parseFloat(getRequestParameter(context, paramName));
    }

    public static <T> T getAttrOrSetDefault(ServletApplicationContext context, String attrName, T defaultValue) {
        var session = context.getSession();
        Object value = session.getAttribute(attrName);
        if (value != null) {
            return (T) value;
        }
        session.setAttribute(attrName, defaultValue);
        return defaultValue;
    }

    public static Object getSessionAttribute(ServletApplicationContext context, String attrName) {
        return context.getSession().getAttribute(attrName);
    }

    public static long paramToLong(ServletApplicationContext context, String paramName) {
        return Long.parseLong(getRequestParameter(context, paramName));
    }

    public static String getRequestParameter(ServletApplicationContext context, String paramName) {
        return context.getRequest().getParameter(paramName);
    }

}
