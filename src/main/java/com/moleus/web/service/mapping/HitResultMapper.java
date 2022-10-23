package com.moleus.web.service.mapping;

import com.moleus.web.dto.HitResultDto;
import com.moleus.web.model.HitResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HitResultMapper {
    HitResultMapper INSTANCE = Mappers.getMapper(HitResultMapper.class);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", ignore = true)
    HitResult toEntity(HitResultDto hitResultDto);
    HitResultDto toDto(HitResult hitResult);
}
