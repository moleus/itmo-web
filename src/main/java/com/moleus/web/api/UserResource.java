package com.moleus.web.api;

import com.moleus.web.dto.UserDto;
import com.moleus.web.service.stratagies.auth.LoginAction;
import com.moleus.web.service.stratagies.auth.RegisterAction;
import com.moleus.web.util.RestUtil;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ejb.EJB;
import jakarta.validation.Valid;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import lombok.extern.log4j.Log4j2;

@RolesAllowed({"Authorised"})
@Path("/user")
@Log4j2
public class UserResource {
    @EJB LoginAction loginAction;
    @EJB RegisterAction registerAction;

    @POST
    @Path("/login")
    public Response login(@Valid UserDto userDto) {
        log.info("Processing login request");
        var result = loginAction.runWithData(userDto);
        return RestUtil.fromActionResult(result);
    }

    @POST
    @Path("/register")
    public Response register(@Valid UserDto userDto) {
        log.info("Processing register request");
        var result = registerAction.runWithData(userDto);
        return RestUtil.fromActionResult(result);
    }
}
