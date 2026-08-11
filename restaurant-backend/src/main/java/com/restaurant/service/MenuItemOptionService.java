package com.restaurant.service;

import java.util.List;

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

    public List<MenuItemOption> getOptions(Long menuItemId) {

        return optionRepository.findByMenuItemId(menuItemId);

    }

    public MenuItemOption addOption(
            Long menuItemId,
            MenuItemOption option) {

        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Menu item not found"));

        option.setMenuItem(menuItem);

        return optionRepository.save(option);

    }
    
    public void deleteOption(Long id) {

        optionRepository.deleteById(id);

    }
    
    public MenuItemOption updateOption(
            Long id,
            MenuItemOption updatedOption) {

        MenuItemOption option = optionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Option not found"));

        option.setName(updatedOption.getName());
        option.setPrice(updatedOption.getPrice());

        return optionRepository.save(option);

    }

}