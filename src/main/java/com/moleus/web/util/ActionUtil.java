package com.moleus.web.util;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.io.IOException;
import java.io.PrintWriter;

@Log4j2
public class ActionUtil {
    private static final Gson gson = new Gson();

    public static void sendAsJson(HttpServletResponse response, Object obj) throws IOException {
        response.setContentType("application/json");

        String res = gson.toJson(obj);
        PrintWriter out = response.getWriter();

        out.print(res);
        out.flush();
    }
}
