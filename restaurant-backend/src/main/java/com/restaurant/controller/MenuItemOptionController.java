package com.restaurant.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.restaurant.entity.MenuItemOption;
import com.restaurant.service.MenuItemOptionService;

@RestController
@RequestMapping("/api/menu-items/{menuItemId}/options")
public class MenuItemOptionController {

    @Autowired
    private MenuItemOptionService optionService;

    @GetMapping
    public List<MenuItemOption> getOptions(
            @PathVariable UUID menuItemId) {

        return optionService.getOptions(menuItemId);

    }

    @PostMapping
    public MenuItemOption addOption(
            @PathVariable UUID menuItemId,
            @RequestBody MenuItemOption option) {

        return optionService.addOption(menuItemId, option);

    }
    
    @DeleteMapping("/{id}")
    public void deleteOption(@PathVariable UUID id) {

        optionService.deleteOption(id);

    }
    
    @PutMapping("/{id}")
    public MenuItemOption updateOption(
            @PathVariable UUID id,
            @RequestBody MenuItemOption option) {

        return optionService.updateOption(id, option);

    }

}