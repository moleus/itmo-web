package com.moleus.web.dto;

import lombok.Data;

@Data
public class UserDto {
    String name;
    byte[] passwordHash;
}
