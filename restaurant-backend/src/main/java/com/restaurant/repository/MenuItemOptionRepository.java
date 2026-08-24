package com.restaurant.repository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.entity.MenuItemOption;

public interface MenuItemOptionRepository
        extends JpaRepository<MenuItemOption, UUID> {

    List<MenuItemOption> findByMenuItemId(UUID menuItemId);

}