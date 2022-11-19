package com.moleus.web.util;

import com.moleus.web.controller.ServletApplicationContext;

public class ServletUtil {
    public static Object getSessionAttribute(String attrName) {
        return ServletApplicationContext.getCurrentInstance().getSession().getAttribute(attrName);
    }

    public static void setSessionAttribute(String attrName, Object attribute) {
        ServletApplicationContext.getCurrentInstance().getSession().setAttribute(attrName, attribute);
    }
}
