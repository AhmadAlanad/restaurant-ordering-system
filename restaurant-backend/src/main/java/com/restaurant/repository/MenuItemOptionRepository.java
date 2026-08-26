package com.restaurant.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.entity.MenuItemOption;

public interface MenuItemOptionRepository
        extends JpaRepository<MenuItemOption, UUID> {

    // Active options for customers
    List<MenuItemOption> findByMenuItemIdAndAvailableTrue(UUID menuItemId);

    // All options for admin, sorted by creation time
    List<MenuItemOption> findByMenuItemIdOrderByCreatedAtAsc(UUID menuItemId);

}
