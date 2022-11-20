package com.moleus.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.core.config.plugins.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class HitCoordinatesDto implements GenericDto {
    @NotBlank
    private float x;
    @NotBlank
    private float y;
    @NotBlank
    private float r;
}
