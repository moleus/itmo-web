package com.moleus.web.util;

import com.moleus.web.controller.ServletApplicationContext;

public class ServletUtil {
    public static float paramToFloat(String paramName) {
        return Float.parseFloat(getRequestParameter(paramName));
    }

    public static Object getSessionAttribute(String attrName) {
        return ServletApplicationContext.getCurrentInstance().getSession().getAttribute(attrName);
    }

    public static void setSessionAttribute(String attrName, Object attribute) {
        ServletApplicationContext.getCurrentInstance().getSession().setAttribute(attrName, attribute);
    }

    public static String getRequestParameter(String paramName) {
        return ServletApplicationContext.getCurrentInstance().getRequest().getParameter(paramName);
    }

}
