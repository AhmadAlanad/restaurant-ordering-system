package com.restaurant.service;

import java.util.List;
import java.util.UUID;
import com.restaurant.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.entity.Category;
import com.restaurant.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category updateCategory(UUID id, Category updatedCategory) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        category.setName(updatedCategory.getName());

        return categoryRepository.save(category);

    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Category saveCategory(Category category) {

        if (category.getDisplayOrder() == null) {

            List<Category> categories = categoryRepository.findAll();

            int nextOrder = categories.size() + 1;

            category.setDisplayOrder(nextOrder);
        }

        return categoryRepository.save(category);
    }

}