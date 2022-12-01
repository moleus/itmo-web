package com.moleus.web.service.stratagies.hits;

import com.moleus.web.dao.HitResultsRepository;
import com.moleus.web.dto.HitResultDto;
import com.moleus.web.dto.ResponsePayload;
import com.moleus.web.model.HitResult;
import com.moleus.web.service.mapping.HitResultMapper;
import com.moleus.web.service.stratagies.ActionResult;
import com.moleus.web.service.stratagies.ActionStatus;
import com.moleus.web.service.stratagies.ParametricAction;
import com.moleus.web.service.stratagies.auth.UserProvider;
import jakarta.ejb.EJB;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateless;
import lombok.extern.log4j.Log4j2;

import java.util.List;
import java.util.PrimitiveIterator;
import java.util.stream.IntStream;

@Stateless
@LocalBean
@Log4j2
public class GetHitsAction implements ParametricAction<String> {
    @EJB
    private UserProvider userProvider;
    @EJB
    private HitResultsRepository hitsProvider;

    @Override
    public ActionResult execute(String userVersion) {
        var hits = hitsProvider.findByUserId(userProvider.getCurrentUser().getId());
        var hits_dto_slice = mapWithOrderedIds(hits);
        return new ActionResult(ActionStatus.OK, ResponsePayload.okWithPayload(hits_dto_slice));
    }

    private List<HitResultDto> mapWithOrderedIds(List<HitResult> hits) {
        PrimitiveIterator.OfInt ids = IntStream.range(0, hits.size()).iterator();
        var hitsDto = hits.stream().map(HitResultMapper.INSTANCE::toDto).toList();
        hitsDto.forEach(hit -> hit.setId(ids.next()));
        return hitsDto;
    }
}
