package com.restaurant.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.entity.RestaurantSettings;
import com.restaurant.repository.RestaurantSettingsRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.restaurant.entity.User;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.repository.UserRepository;

@Service
public class RestaurantSettingsService {

    @Autowired
    private RestaurantSettingsRepository restaurantSettingsRepository;
    @Autowired
    private UserRepository userRepository;
    
    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Authenticated user not found"));
    }

    public RestaurantSettings getSettings() {

        if (restaurantSettingsRepository.count() == 0) {

            RestaurantSettings settings = new RestaurantSettings();
            settings.setOpen(true);

            return restaurantSettingsRepository.save(settings);
        }

        return restaurantSettingsRepository.findAll().get(0);
    }

    public RestaurantSettings setOpen(boolean open) {

        User authenticatedUser = getAuthenticatedUser();

        if (authenticatedUser.getRole() != com.restaurant.enums.Role.ADMIN) {
            throw new org.springframework.security.access.AccessDeniedException(
                    "Only administrators can change the restaurant status"
            );
        }

        RestaurantSettings settings = getSettings();

        settings.setOpen(open);

        return restaurantSettingsRepository.save(settings);
    }

    public boolean isOpen() {

        return getSettings().isOpen();
    }
}