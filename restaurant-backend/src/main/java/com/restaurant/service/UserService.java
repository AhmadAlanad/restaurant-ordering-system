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
import com.restaurant.dto.LoginResponseDTO;
import com.restaurant.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;



@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;
    
    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Authenticated user not found"));
    }

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
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
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

    public LoginResponseDTO login(LoginRequestDTO request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        UserResponseDTO userResponse = new UserResponseDTO();

        userResponse.setId(user.getId());
        userResponse.setFullName(user.getFullName());
        userResponse.setEmail(user.getEmail());
        userResponse.setRole(user.getRole());
        userResponse.setPhone(user.getPhone());

        String token = jwtService.generateToken(user);

        return new LoginResponseDTO(
                token,
                userResponse
        );
    }
    
    public void changePassword(
            Long id,
            ChangePasswordDTO request) {

        User authenticatedUser = getAuthenticatedUser();

        if (!authenticatedUser.getId().equals(id)) {

            throw new org.springframework.security.access.AccessDeniedException(
                    "You cannot change another user's password");
        }

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                authenticatedUser.getPassword())) {

            throw new RuntimeException(
                    "Current password is incorrect.");
        }

        authenticatedUser.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(authenticatedUser);
    }
    
    
    
    public User getUserById(
            Long id,
            Authentication authentication) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (!user.getEmail().equals(authentication.getName())
                && !authentication.getAuthorities().stream()
                        .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {

        	throw new org.springframework.security.access.AccessDeniedException(
        	        "You are not allowed to access this user"
        	);
        }

        return user;
    }
    
    public User updateUser(
            Long id,
            User updatedUser,
            Authentication authentication) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (!user.getEmail().equals(authentication.getName())
                && !authentication.getAuthorities().stream()
                        .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {

        	throw new org.springframework.security.access.AccessDeniedException(
        	        "You are not allowed to access this user"
        	);
        }

        user.setFullName(updatedUser.getFullName());
        user.setPhone(updatedUser.getPhone());

        return userRepository.save(user);
    }

}