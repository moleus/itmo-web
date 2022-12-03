package com.moleus.web.api;

import com.moleus.web.dto.UserDto;
import com.moleus.web.service.stratagies.auth.HttpUserCredentials;
import com.moleus.web.service.stratagies.auth.LoginAction;
import com.moleus.web.service.stratagies.auth.LogoutAction;
import com.moleus.web.service.stratagies.auth.RegisterAction;
import com.moleus.web.util.RestUtil;
import jakarta.ejb.EJB;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.ws.rs.HEAD;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import lombok.extern.log4j.Log4j2;

@Path("/user")
@Log4j2
public class UserResource {
    @EJB LoginAction loginAction;
    @EJB LogoutAction logoutAction;
    @EJB RegisterAction registerAction;

    @POST
    @Path("/login")
    public Response login(@Valid UserDto userDto, @Context HttpServletRequest request, @Context HttpServletResponse response) {
        var httpUserCredentials = new HttpUserCredentials(userDto, request, response);
        var result = loginAction.execute(httpUserCredentials);
        return RestUtil.fromActionResult(result);
    }

    @POST
    @Path("/register")
    public Response register(@Valid UserDto userDto, @Context HttpServletRequest request, @Context HttpServletResponse response) {
        var httpUserCredentials = new HttpUserCredentials(userDto, request, response);
        var result = registerAction.execute(httpUserCredentials);
        return RestUtil.fromActionResult(result);
    }

    @HEAD
    @Path("/logout")
    public Response logout(@Context HttpServletRequest request) {
        var result = logoutAction.execute(request);
        return RestUtil.fromActionResult(result);
    }
}
