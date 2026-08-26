package com.restaurant.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
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
    
    
    @GetMapping("/all")
    public List<MenuItemOption> getAllOptions(
            @PathVariable UUID menuItemId) {

        return optionService.getAllOptions(menuItemId);
    }
    


    @PostMapping 
    public MenuItemOption addOption( 
    		@PathVariable UUID menuItemId,
    		@Valid @RequestBody MenuItemOption option) { 
    	return optionService.addOption(menuItemId, option); }
    
    @DeleteMapping("/{id}")
    public void deleteOption(@PathVariable UUID id) {

        optionService.deleteOption(id);

    }
    
    @PutMapping("/{id}")
    public MenuItemOption updateOption(
            @PathVariable UUID id,
            @Valid @RequestBody MenuItemOption option) {

        return optionService.updateOption(id, option);

    }
    
    
    @PutMapping("/{id}/restore")
    public MenuItemOption restoreOption(@PathVariable UUID id) {

        return optionService.restoreOption(id);
    }
    


}