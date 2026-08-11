package com.restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.dto.LoginRequestDTO;
import com.restaurant.dto.RegisterRequestDTO;
import com.restaurant.dto.UserResponseDTO;
import com.restaurant.entity.User;
import com.restaurant.enums.Role;
import com.restaurant.repository.UserRepository;
import com.restaurant.dto.ChangePasswordDTO;
import com.restaurant.dto.LocationRequestDTO;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponseDTO register(RegisterRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException("Email already exists.");

        }
        
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());
        

        user.setRole(Role.CUSTOMER);

        userRepository.save(user);

        UserResponseDTO response = new UserResponseDTO();

        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setPhone(user.getPhone());
        

        return response;
    }

    public UserResponseDTO login(LoginRequestDTO request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!user.getPassword().equals(request.getPassword())) {

            throw new RuntimeException("Invalid email or password");

        }

        UserResponseDTO response = new UserResponseDTO();

        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setPhone(user.getPhone());
        

        return response;
    }
    
    public void changePassword(Long id, ChangePasswordDTO request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.getPassword().equals(request.getCurrentPassword())) {

            throw new RuntimeException("Current password is incorrect.");

        }

        user.setPassword(request.getNewPassword());

        userRepository.save(user);

    }
    
    public UserResponseDTO updateLocation(
            Long userId,
            LocationRequestDTO request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        

        userRepository.save(user);

        UserResponseDTO response = new UserResponseDTO();

        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setRole(user.getRole());


        return response;
    }
    
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    }
    
    public User updateUser(Long id, User updatedUser) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setFullName(updatedUser.getFullName());
        user.setPhone(updatedUser.getPhone());
        

        return userRepository.save(user);

    }

}