package com.moleus.web.service.mapping;

import com.moleus.web.dto.UserDto;
import com.moleus.web.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDto userToDto(User user);
}
