package com.restaurant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.entity.MenuItemOption;

public interface MenuItemOptionRepository
        extends JpaRepository<MenuItemOption, Long> {

    List<MenuItemOption> findByMenuItemId(Long menuItemId);

}