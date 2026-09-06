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
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    public List<MenuItem> getAllMenuItems() {

        return menuItemRepository
                .findAllOrderedByCategoryAndDisplayOrder();

    }

    public MenuItem saveMenuItem(MenuItem menuItem) {

        if (menuItem.getDisplayOrder() == null) {

            UUID categoryId = menuItem.getCategory().getId();

            List<MenuItem> items = menuItemRepository
                    .findByCategoryIdOrderByDisplayOrderAsc(
                            categoryId);

            int nextOrder = items.size() + 1;

            menuItem.setDisplayOrder(nextOrder);
        }

        // Move temporary image to permanent storage
        String imageUrl = menuItem.getImageUrl();

        if (imageUrl != null &&
                !imageUrl.isBlank()) {

            Path tempImagePath = Paths.get(
                    "restaurant-backend/uploads/temp/",
                    imageUrl);

            Path permanentImagePath = Paths.get(
                    "restaurant-backend/uploads/images/",
                    imageUrl);

            try {

                if (Files.exists(tempImagePath)) {

                    Files.move(
                            tempImagePath,
                            permanentImagePath,
                            StandardCopyOption.REPLACE_EXISTING);
                }

            } catch (Exception e) {

                throw new RuntimeException(
                        "Failed to move uploaded image",
                        e);
            }
        }

        return menuItemRepository.save(menuItem);
    }

    public MenuItem updateMenuItem(UUID id, MenuItem updatedItem) {

        MenuItem existingItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        String oldImageUrl = existingItem.getImageUrl();
        String newImageUrl = updatedItem.getImageUrl();

        // Move new temporary image to permanent storage
        if (newImageUrl != null &&
                !newImageUrl.isBlank() &&
                !newImageUrl.equals(oldImageUrl)) {

            Path tempImagePath = Paths.get(
                    "restaurant-backend/uploads/temp/",
                    newImageUrl);

            Path permanentImagePath = Paths.get(
                    "restaurant-backend/uploads/images/",
                    newImageUrl);

            try {

                if (Files.exists(tempImagePath)) {

                    Files.move(
                            tempImagePath,
                            permanentImagePath,
                            StandardCopyOption.REPLACE_EXISTING);
                }

            } catch (Exception e) {

                throw new RuntimeException(
                        "Failed to move uploaded image",
                        e);
            }
        }

        // Update menu item
        existingItem.setName(updatedItem.getName());
        existingItem.setDescription(updatedItem.getDescription());
        existingItem.setPrice(updatedItem.getPrice());
        existingItem.setImageUrl(newImageUrl);
        existingItem.setAvailable(updatedItem.isAvailable());
        existingItem.setCategory(updatedItem.getCategory());

        MenuItem savedItem = menuItemRepository.save(existingItem);

        // Delete old uploaded image if it was replaced
        if (oldImageUrl != null &&
                !oldImageUrl.equals(newImageUrl)) {

            Path oldImagePath = Paths.get(
                    "restaurant-backend/uploads/images/",
                    oldImageUrl);

            try {

                if (Files.exists(oldImagePath)) {

                    Files.delete(oldImagePath);
                }

            } catch (Exception e) {

                System.err.println(
                        "Could not delete old uploaded image: "
                                + oldImageUrl);
            }
        }

        return savedItem;
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
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found"));

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
        return menuItemRepository.findByCategoryIdOrderByDisplayOrderAsc(categoryId);
    }

    public List<MenuItem> getByPrice(
            double min,
            double max) {

        return menuItemRepository.findByPriceBetween(min, max);

    }

}