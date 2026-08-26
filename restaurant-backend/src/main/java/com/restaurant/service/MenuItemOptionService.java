package com.restaurant.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.entity.MenuItem;
import com.restaurant.entity.MenuItemOption;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.repository.MenuItemOptionRepository;
import com.restaurant.repository.MenuItemRepository;

@Service
public class MenuItemOptionService {

    @Autowired
    private MenuItemOptionRepository optionRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    public List<MenuItemOption> getOptions(UUID menuItemId) {
        return optionRepository.findByMenuItemIdAndAvailableTrue(menuItemId);
    }
    
    
    public List<MenuItemOption> getAllOptions(UUID menuItemId) {

        return optionRepository.findByMenuItemIdOrderByCreatedAtAsc(menuItemId);
    }
    


    public MenuItemOption addOption(
            UUID menuItemId,
            MenuItemOption option) {

        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Menu item not found"));

        option.setMenuItem(menuItem);

        return optionRepository.save(option);

    }

    public void deleteOption(UUID id) {

        MenuItemOption option = optionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Option not found"));

        option.setAvailable(false);

        optionRepository.save(option);
    }

    public MenuItemOption updateOption(
    		UUID id,
            MenuItemOption updatedOption) {

        MenuItemOption option = optionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Option not found"));

        option.setName(updatedOption.getName());
        option.setPrice(updatedOption.getPrice());

        return optionRepository.save(option);
    }
    
    
    public MenuItemOption restoreOption(UUID id) {

        MenuItemOption option = optionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Option not found"));

        option.setAvailable(true);

        return optionRepository.save(option);
    }
    

}