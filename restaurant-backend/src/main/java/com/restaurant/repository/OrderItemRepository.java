package com.restaurant.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.entity.OrderItem;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface OrderItemRepository
                extends JpaRepository<OrderItem, UUID> {

        @Query("""
                        SELECT oi.menuItem.id,
                               oi.menuItem.name,
                               SUM(oi.quantity)
                        FROM OrderItem oi
                        WHERE oi.order.status = com.restaurant.enums.OrderStatus.DELIVERED
                        GROUP BY oi.menuItem.id,
                                 oi.menuItem.name
                        ORDER BY SUM(oi.quantity) DESC
                        """)
        List<Object[]> findBestSellingItems();

        @Query("""
                        SELECT oi.menuItem.category.id,
                               oi.menuItem.category.name,
                               SUM(oi.quantity),
                               SUM(oi.price * oi.quantity)
                        FROM OrderItem oi
                        WHERE oi.order.status =
                              com.restaurant.enums.OrderStatus.DELIVERED
                          AND oi.order.orderDate >= :from
                          AND oi.order.orderDate < :to
                        GROUP BY oi.menuItem.category.id,
                                 oi.menuItem.category.name
                        ORDER BY SUM(oi.price * oi.quantity) DESC
                        """)
        List<Object[]> findCategorySales(
                        @Param("from") LocalDateTime from,
                        @Param("to") LocalDateTime to);

        @Query("""
                        SELECT oi.menuItem.id,
                               oi.menuItem.name,
                               SUM(oi.quantity),
                               SUM(oi.price * oi.quantity)
                        FROM OrderItem oi
                        WHERE oi.order.status =
                              com.restaurant.enums.OrderStatus.DELIVERED
                          AND oi.menuItem.category.id = :categoryId
                          AND oi.order.orderDate >= :from
                          AND oi.order.orderDate < :to
                        GROUP BY oi.menuItem.id,
                                 oi.menuItem.name
                        ORDER BY SUM(oi.price * oi.quantity) DESC
                        """)
        List<Object[]> findCategoryMenuItemSales(
                        @Param("categoryId") UUID categoryId,
                        @Param("from") LocalDateTime from,
                        @Param("to") LocalDateTime to);

}
