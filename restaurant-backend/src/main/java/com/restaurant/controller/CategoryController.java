package com.restaurant.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.restaurant.entity.Category;
import com.restaurant.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Get all categories
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // Add a new category
    @PostMapping
    public Category addCategory(@RequestBody Category category) {
        return categoryService.saveCategory(category);
    }
    
    @PutMapping("/{id}")
    public Category updateCategory(
            @PathVariable UUID id,
            @RequestBody Category category) {

        return categoryService.updateCategory(id, category);

    }
}