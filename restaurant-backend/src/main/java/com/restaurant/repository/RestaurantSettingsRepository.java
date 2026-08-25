package com.restaurant.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.entity.RestaurantSettings;

public interface RestaurantSettingsRepository
        extends JpaRepository<RestaurantSettings, UUID> {
}