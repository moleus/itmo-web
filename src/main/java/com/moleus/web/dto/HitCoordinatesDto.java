package com.moleus.web.dto;

import lombok.Data;
import org.apache.logging.log4j.core.config.plugins.validation.constraints.NotBlank;

@Data
public class HitCoordinatesDto implements GenericDto {
    @NotBlank
    private float x;
    @NotBlank
    private float y;
    @NotBlank
    private float r;
}
