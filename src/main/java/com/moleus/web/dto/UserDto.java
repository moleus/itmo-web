package com.moleus.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto implements GenericDto {
    @Size(min=4, message = "Username should be longer than 4 characters")
    @NotBlank(message = "Username must be provided")
    private String username;

    @Size(min=4, message = "Password should be longer than 4 characters")
    @NotBlank(message = "Password must be provided")
    private String password;
}
