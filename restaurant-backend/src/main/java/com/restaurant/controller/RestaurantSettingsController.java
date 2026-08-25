package com.restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.restaurant.entity.RestaurantSettings;
import com.restaurant.service.RestaurantSettingsService;

@RestController
@RequestMapping("/api/restaurant")
public class RestaurantSettingsController {

    @Autowired
    private RestaurantSettingsService restaurantSettingsService;

    @GetMapping("/status")
    public RestaurantSettings getStatus() {
        return restaurantSettingsService.getSettings();
    }

    @PutMapping("/open")
    public RestaurantSettings openRestaurant() {
        return restaurantSettingsService.setOpen(true);
    }

    @PutMapping("/close")
    public RestaurantSettings closeRestaurant() {
        return restaurantSettingsService.setOpen(false);
    }
}