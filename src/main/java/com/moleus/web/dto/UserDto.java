package com.moleus.web.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserDto implements GenericDto {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
