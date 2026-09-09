package com.restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.restaurant.entity.Order;
import com.restaurant.enums.OrderStatus;

import java.util.UUID;

import com.restaurant.dto.CategorySalesDTO;
import com.restaurant.dto.CategoryMenuItemSalesDTO;

import com.restaurant.dto.SalesReportDTO;
import com.restaurant.repository.OrderRepository;
import com.restaurant.repository.OrderItemRepository;
import com.restaurant.dto.BestSellingItemDTO;

@Service
public class SalesReportService {

        @Autowired
        private OrderRepository orderRepository;

        @Autowired
        private OrderItemRepository orderItemRepository;

        public SalesReportDTO getSalesReport(
                        LocalDate from,
                        LocalDate to) {

                SalesReportDTO report = new SalesReportDTO();
                List<Order> allOrders = orderRepository.findAll();

                // Only DELIVERED orders count as revenue
                List<Order> deliveredOrders = orderRepository.findByStatus(OrderStatus.DELIVERED);

                double totalRevenue = 0;
                double todayRevenue = 0;
                double weekRevenue = 0;
                double monthRevenue = 0;

                LocalDate today = LocalDate.now();

                for (Order order : deliveredOrders) {

                        if (order.getOrderDate() == null) {
                                continue;
                        }

                        LocalDate orderDate = order.getOrderDate().toLocalDate();

                        // Apply date range filter
                        if (from != null && orderDate.isBefore(from)) {
                                continue;
                        }

                        if (to != null && orderDate.isAfter(to)) {
                                continue;
                        }

                        // Total revenue for the selected range
                        totalRevenue += order.getTotalPrice();

                        // Today's revenue
                        if (orderDate.equals(today)) {

                                todayRevenue += order.getTotalPrice();

                        }

                        // Last 7 days
                        if (!orderDate.isBefore(today.minusDays(6))) {

                                weekRevenue += order.getTotalPrice();

                        }

                        // Current month
                        if (orderDate.getMonth() == today.getMonth()
                                        && orderDate.getYear() == today.getYear()) {

                                monthRevenue += order.getTotalPrice();

                        }

                }

                // Order statistics

                long totalOrders = 0;
                long acceptedOrders = 0;
                long pendingOrders = 0;
                long rejectedOrders = 0;

                for (Order order : allOrders) {

                        if (order.getOrderDate() == null) {
                                continue;
                        }

                        LocalDate orderDate = order.getOrderDate().toLocalDate();

                        // Apply date range filter
                        if (from != null && orderDate.isBefore(from)) {
                                continue;
                        }

                        if (to != null && orderDate.isAfter(to)) {
                                continue;
                        }

                        totalOrders++;

                        if (order.getStatus() == OrderStatus.PENDING) {

                                pendingOrders++;

                        } else if (order.getStatus() == OrderStatus.REJECTED) {

                                rejectedOrders++;

                        } else if (order.getStatus() == OrderStatus.ACCEPTED
                                        || order.getStatus() == OrderStatus.PREPARING
                                        || order.getStatus() == OrderStatus.READY
                                        || order.getStatus() == OrderStatus.DELIVERED) {

                                acceptedOrders++;

                        }

                }

                report.setTotalOrders(totalOrders);
                report.setAcceptedOrders(acceptedOrders);
                report.setPendingOrders(pendingOrders);
                report.setRejectedOrders(rejectedOrders);

                // Revenue
                report.setTotalRevenue(totalRevenue);
                report.setTodayRevenue(todayRevenue);
                report.setWeekRevenue(weekRevenue);
                report.setMonthRevenue(monthRevenue);

                // Best-selling items

                List<Object[]> bestSellingResults = orderItemRepository.findBestSellingItems();

                List<BestSellingItemDTO> bestSellingItems = bestSellingResults.stream()
                                .map(row -> new BestSellingItemDTO(
                                                (java.util.UUID) row[0],
                                                (String) row[1],
                                                ((Number) row[2]).longValue()))
                                .toList();

                report.setBestSellingItems(bestSellingItems);

                return report;
        }

        public List<CategorySalesDTO> getCategorySales(
                        LocalDate from,
                        LocalDate to) {

                LocalDateTime fromDateTime;
                LocalDateTime toDateTime;

                // No filter selected
                if (from == null && to == null) {

                        fromDateTime = LocalDateTime.of(
                                        2000, 1, 1, 0, 0, 0);

                        toDateTime = LocalDateTime.now();

                } else {

                        // From date
                        fromDateTime = from
                                        .atStartOfDay();

                        // To date
                        // Add one day so the entire selected date is included
                        toDateTime = to
                                        .plusDays(1)
                                        .atStartOfDay();

                }

                List<Object[]> results = orderItemRepository.findCategorySales(
                                fromDateTime,
                                toDateTime);

                return results.stream()
                                .map(row -> new CategorySalesDTO(
                                                (UUID) row[0],
                                                (String) row[1],
                                                ((Number) row[2]).longValue(),
                                                ((Number) row[3]).doubleValue()))
                                .toList();
        }

        public List<CategoryMenuItemSalesDTO> getCategoryMenuItemSales(
                        UUID categoryId,
                        LocalDate from,
                        LocalDate to) {

                LocalDateTime fromDateTime;
                LocalDateTime toDateTime;

                // No filter selected
                if (from == null && to == null) {

                        fromDateTime = LocalDateTime.of(
                                        2000, 1, 1, 0, 0, 0);

                        toDateTime = LocalDateTime.now();

                } else {

                        fromDateTime = from.atStartOfDay();

                        // Include the entire "to" date
                        toDateTime = to
                                        .plusDays(1)
                                        .atStartOfDay();

                }

                List<Object[]> results = orderItemRepository.findCategoryMenuItemSales(
                                categoryId,
                                fromDateTime,
                                toDateTime);

                return results.stream()
                                .map(row -> new CategoryMenuItemSalesDTO(
                                                (UUID) row[0],
                                                (String) row[1],
                                                ((Number) row[2]).longValue(),
                                                ((Number) row[3]).doubleValue()))
                                .toList();
        }

}