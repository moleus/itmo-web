package com.moleus.web.api;

import com.moleus.web.dto.HitCoordinatesDto;
import com.moleus.web.service.stratagies.hits.AddHitAction;
import com.moleus.web.service.stratagies.hits.DeleteHitsAction;
import com.moleus.web.service.stratagies.hits.GetHitsAction;
import com.moleus.web.util.RestUtil;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ejb.EJB;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

@RolesAllowed({"Authorised"})
@Path("/hits")
@ApplicationScoped
public class HitResource {
    @EJB GetHitsAction getHitsAction;
    @EJB AddHitAction addHitAction;
    @EJB DeleteHitsAction deleteHitsAction;

    @POST
    @Path("/add")
    public Response addHits(@Valid HitCoordinatesDto hitCoordinates) {
        var result = addHitAction.execute(hitCoordinates);
        return RestUtil.fromActionResult(result);
    }

    @DELETE
    @Path("/")
    public Response deleteHits() {
        var result = deleteHitsAction.execute();
        return RestUtil.fromActionResult(result);
    }

    @GET
    @Path("/")
    public Response getHits(@QueryParam("version") String version) {
        var result = getHitsAction.execute(version);
        return RestUtil.fromActionResult(result);
    }
}
