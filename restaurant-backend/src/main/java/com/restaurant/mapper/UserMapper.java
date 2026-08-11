package com.restaurant.mapper;

import com.restaurant.dto.UserResponseDTO;
import com.restaurant.entity.User;

public class UserMapper {

    public static UserResponseDTO toDTO(User user) {

        UserResponseDTO dto = new UserResponseDTO();

        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setRole(user.getRole());

        return dto;
    }

}