package com.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.restaurant.entity.Order;
import java.util.List;
import com.restaurant.enums.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	long countByStatus(OrderStatus status);

	List<Order> findByStatus(OrderStatus status);
	List<Order> findByUserId(Long userId);
	List<Order> findAllByOrderByIdDesc();

}