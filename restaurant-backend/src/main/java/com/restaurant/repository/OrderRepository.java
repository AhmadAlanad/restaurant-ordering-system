package com.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.restaurant.entity.Order;
import java.util.List;
import com.restaurant.enums.OrderStatus;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
	
	long countByStatus(OrderStatus status);

	List<Order> findByStatus(OrderStatus status);
	List<Order> findByUserIdOrderByOrderDateDesc(UUID userId);

	List<Order> findAllByOrderByOrderDateDesc();
	
	
	long countByStatusAndOrderDateBetween(
	        OrderStatus status,
	        java.time.LocalDateTime start,
	        java.time.LocalDateTime end
	);

	long countByOrderDateBetween(
	        java.time.LocalDateTime start,
	        java.time.LocalDateTime end
	);
	
	long countByAcceptedAtBetween(
			java.time.LocalDateTime start,
			java.time.LocalDateTime end
	);

	long countByRejectedAtBetween(
			java.time.LocalDateTime start,
			java.time.LocalDateTime end
	);

}