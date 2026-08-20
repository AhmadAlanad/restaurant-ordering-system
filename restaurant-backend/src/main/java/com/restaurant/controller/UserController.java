package com.restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.restaurant.entity.User;
import com.restaurant.dto.LoginRequestDTO;
import com.restaurant.dto.RegisterRequestDTO;
import com.restaurant.dto.UserResponseDTO;
import com.restaurant.service.UserService;
import com.restaurant.mapper.UserMapper;
import com.restaurant.dto.ChangePasswordDTO;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public UserResponseDTO register(
    		@Valid @RequestBody RegisterRequestDTO request) {

        return userService.register(request);

    }

    @PostMapping("/login")
    public UserResponseDTO login(
            @Valid @RequestBody LoginRequestDTO request) {

        return userService.login(request);
    }
    
    @GetMapping("/{id}")
    public UserResponseDTO getUserById(@PathVariable Long id) {

        return UserMapper.toDTO(userService.getUserById(id));

    }
    
    @PutMapping("/{id}")
    public UserResponseDTO updateUser(
            @PathVariable Long id,
            @RequestBody User user) {

        return UserMapper.toDTO(
                userService.updateUser(id, user));

    }
    
    @PutMapping("/{id}/change-password")
    public void changePassword(
            @PathVariable Long id,
            @RequestBody ChangePasswordDTO request) {

        userService.changePassword(id, request);

    }
    
    

}