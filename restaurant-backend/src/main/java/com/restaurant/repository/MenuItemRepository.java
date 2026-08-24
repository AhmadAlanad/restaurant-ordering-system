package com.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.restaurant.entity.MenuItem;
import java.util.UUID;

public interface MenuItemRepository extends JpaRepository<MenuItem, UUID> {
	
	List<MenuItem> findByNameContainingIgnoreCase(String name);
	List<MenuItem> findByCategoryId(UUID categoryId);
	List<MenuItem> findByPriceBetween(double minPrice,double maxPrice);

}