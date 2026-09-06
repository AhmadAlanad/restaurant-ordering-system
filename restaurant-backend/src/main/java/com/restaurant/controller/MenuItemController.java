package com.restaurant.controller;

import java.util.List;
import java.util.UUID;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import com.restaurant.entity.MenuItem;
import com.restaurant.service.MenuItemService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

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
    public MenuItem toggleAvailability(@PathVariable UUID id) {

        return menuItemService.toggleAvailability(id);
    }

    @PutMapping("/{id}")
    public MenuItem updateMenuItem(@PathVariable UUID id,
            @Valid @RequestBody MenuItem menuItem) {

        return menuItemService.updateMenuItem(id, menuItem);

    }

    @PostMapping
    public MenuItem addMenuItem(@Valid @RequestBody MenuItem menuItem) {
        return menuItemService.saveMenuItem(menuItem);
    }

    @GetMapping("/{id}")
    public MenuItem getMenuItemById(@PathVariable UUID id) {

        return menuItemService.getMenuItemById(id);

    }

    @GetMapping("/search")
    public List<MenuItem> searchMenuItems(
            @RequestParam String name) {

        return menuItemService.searchByName(name);
    }

    @GetMapping("/category/{id}")
    public List<MenuItem> getByCategory(
            @PathVariable UUID id) {

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

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(
            @RequestParam("image") MultipartFile image) throws IOException {

        // Make sure a file was selected
        if (image.isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("No image selected");
        }

        // Only allow image files
        String contentType = image.getContentType();

        if (contentType == null ||
                !contentType.startsWith("image/")) {

            return ResponseEntity.badRequest()
                    .body("Only image files are allowed");
        }

        Path uploadPath = Paths.get(
                "restaurant-backend/uploads/temp/");

        // Create the folder if it does not exist
        if (!Files.exists(uploadPath)) {

            Files.createDirectories(uploadPath);
        }

        // Get original filename
        String originalFileName = image.getOriginalFilename();

        if (originalFileName == null ||
                originalFileName.isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Invalid image filename");
        }

        // Get file extension
        String extension = "";

        int lastDot = originalFileName.lastIndexOf(".");

        if (lastDot >= 0) {

            extension = originalFileName.substring(lastDot)
                    .toLowerCase();
        }

        // Generate unique filename
        String fileName = UUID.randomUUID().toString()
                + extension;

        // Final file path
        Path filePath = uploadPath.resolve(fileName);

        // Save image
        Files.copy(
                image.getInputStream(),
                filePath);

        // Return only the filename
        return ResponseEntity.ok(fileName);
    }

    @DeleteMapping("/upload-image/temp")
    public ResponseEntity<String> deleteTemporaryImage(
            @RequestParam("filename") String filename) {

        if (filename == null || filename.isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Invalid filename");
        }

        Path tempImagePath = Paths.get(
                "restaurant-backend/uploads/temp/",
                filename);

        try {

            if (Files.exists(tempImagePath)) {

                Files.delete(tempImagePath);
            }

            return ResponseEntity.ok(
                    "Temporary image deleted");

        } catch (IOException e) {

            return ResponseEntity.internalServerError()
                    .body("Failed to delete temporary image");
        }
    }

}