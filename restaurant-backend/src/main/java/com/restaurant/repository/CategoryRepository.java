package com.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.entity.Category;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {

}