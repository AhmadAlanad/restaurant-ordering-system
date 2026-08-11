package com.restaurant.controller;

import java.util.List;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestParam;
import com.restaurant.entity.MenuItem;
import com.restaurant.service.MenuItemService;


@RestController
@RequestMapping("/api/menu-items")

public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return menuItemService.getAllMenuItems();
    }
    
    @PutMapping("/{id}/toggle")
    public MenuItem toggleAvailability(@PathVariable Long id) {

        return menuItemService.toggleAvailability(id);
    }
    
    @PutMapping("/{id}")
    public MenuItem updateMenuItem(@PathVariable Long id,
            @Valid @RequestBody MenuItem menuItem) {

        return menuItemService.updateMenuItem(id, menuItem);

    }

    @PostMapping
    public MenuItem addMenuItem(@Valid @RequestBody MenuItem menuItem) {
        return menuItemService.saveMenuItem(menuItem);
    }
    
    @GetMapping("/{id}")
    public MenuItem getMenuItemById(@PathVariable Long id) {

        return menuItemService.getMenuItemById(id);

    }
    
    @GetMapping("/search")
    public List<MenuItem> searchMenuItems(
            @RequestParam String name) {

        return menuItemService.searchByName(name);
    }
    
    @GetMapping("/category/{id}")
    public List<MenuItem> getByCategory(
            @PathVariable Long id) {

        return menuItemService.getByCategory(id);
    }
    
    @GetMapping("/price")
    public List<MenuItem> getByPrice(

            @RequestParam double min,

            @RequestParam double max) {

        return menuItemService.getByPrice(min, max);

    }
    
    @GetMapping("/page")
    public Page<MenuItem> getMenuItems(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size) {

        return menuItemService.getMenuItems(page, size);

    }
    
    @GetMapping("/page/sort")
    public Page<MenuItem> getMenuItemsSorted(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "name") String sortBy) {

        return menuItemService.getMenuItemsSorted(page, size, sortBy);

    }
    
    
}