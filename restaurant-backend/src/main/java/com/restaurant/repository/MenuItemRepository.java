package com.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.restaurant.entity.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
	
	List<MenuItem> findByNameContainingIgnoreCase(String name);
	List<MenuItem> findByCategoryId(Long categoryId);
	List<MenuItem> findByPriceBetween(double minPrice,double maxPrice);

}