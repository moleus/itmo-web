package com.moleus.web.service.stratagies.hits;

import com.moleus.web.dao.EntityAlreadyExistsException;
import com.moleus.web.dao.HitResultsRepository;
import com.moleus.web.dto.HitCoordinatesDto;
import com.moleus.web.model.HitResult;
import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ActionStatus;
import com.moleus.web.service.stratagies.auth.UserProvider;
import com.moleus.web.service.stratagies.hits.logic.HitCalculator;
import com.moleus.web.util.ActionUtil;
import jakarta.ejb.EJB;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateful;
import jakarta.enterprise.context.RequestScoped;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Stateful
@LocalBean
@RequestScoped
public class AddHitAction {
    @EJB private HitResultsRepository hitResultsRepository;
    @EJB private UserProvider userProvider;
    @EJB private HitCalculator hitCalculator;

    public ActionResult execute(HitCoordinatesDto coordinatesDto) {
        try {
            persistResult(coordinatesDto);
            return ActionUtil.statusToResult(ActionStatus.OK);
        } catch (NumberFormatException | NullPointerException | EntityAlreadyExistsException e) {
            log.error("Failed to parse params {} with error {}", coordinatesDto, e.getMessage());
            return ActionUtil.statusToResult(ActionStatus.INVALID_PARAMS);
        }
    }

    private HitResult persistResult(HitCoordinatesDto coordinates) throws EntityAlreadyExistsException {
        HitResult result = hitCalculator.runCalculation(coordinates);
        result.setUserId(userProvider.getCurrentUser().getId());
        hitResultsRepository.save(result);
        return result;
    }
}
