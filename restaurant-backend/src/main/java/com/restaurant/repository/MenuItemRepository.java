package com.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.restaurant.entity.MenuItem;
import java.util.UUID;
import org.springframework.data.jpa.repository.Query;

public interface MenuItemRepository extends JpaRepository<MenuItem, UUID> {

    List<MenuItem> findByNameContainingIgnoreCase(String name);

    List<MenuItem> findByCategoryId(UUID categoryId);

    List<MenuItem> findByPriceBetween(
            double minPrice,
            double maxPrice
    );

    List<MenuItem> findAllByOrderByDisplayOrderAsc();
	List<MenuItem> findByCategoryIdOrderByDisplayOrderAsc(UUID categoryId);
	
@Query("""
        SELECT m
        FROM MenuItem m
        ORDER BY m.category.displayOrder ASC,
                 m.displayOrder ASC
        """)
List<MenuItem> findAllOrderedByCategoryAndDisplayOrder();

}
