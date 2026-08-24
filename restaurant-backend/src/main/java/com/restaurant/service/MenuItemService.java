package com.restaurant.service;

import java.util.UUID;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import com.restaurant.entity.MenuItem;
import com.restaurant.repository.MenuItemRepository;
import com.restaurant.exception.ResourceNotFoundException;

@Service
public class MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public MenuItem saveMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }
    
    public MenuItem updateMenuItem(UUID id, MenuItem updatedItem) {

        MenuItem existingItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        existingItem.setName(updatedItem.getName());
        existingItem.setDescription(updatedItem.getDescription());
        existingItem.setPrice(updatedItem.getPrice());
        existingItem.setImageUrl(updatedItem.getImageUrl());
        existingItem.setAvailable(updatedItem.isAvailable());
        existingItem.setCategory(updatedItem.getCategory());

        return menuItemRepository.save(existingItem);
    }
    
    public MenuItem toggleAvailability(UUID id) {

        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        item.setAvailable(!item.isAvailable());

        return menuItemRepository.save(item);
    }
    
    public Page<MenuItem> getMenuItems(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return menuItemRepository.findAll(pageable);

    }
    
    public MenuItem getMenuItemById(UUID id) {

        return menuItemRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Menu item not found"));

    }
    
    public Page<MenuItem> getMenuItemsSorted(int page,
            int size,
            String sortBy) {

Pageable pageable = PageRequest.of(
page,
size,
Sort.by(sortBy));

return menuItemRepository.findAll(pageable);

}
    
    public List<MenuItem> searchByName(String name) {

        return menuItemRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<MenuItem> getByCategory(UUID categoryId) {

        return menuItemRepository.findByCategoryId(categoryId);

    }
    
    
    public List<MenuItem> getByPrice(
            double min,
            double max) {

        return menuItemRepository.findByPriceBetween(min, max);

    }

}