package com.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.restaurant.entity.Order;
import java.util.List;
import com.restaurant.enums.OrderStatus;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
	
	long countByStatus(OrderStatus status);

	List<Order> findByStatus(OrderStatus status);
	List<Order> findByUserId(UUID userId);
	List<Order> findAllByOrderByIdDesc();

}