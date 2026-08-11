package com.restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import com.restaurant.entity.Order;
import com.restaurant.enums.OrderStatus;

import com.restaurant.dto.SalesReportDTO;
import com.restaurant.repository.OrderRepository;

@Service
public class SalesReportService {

    @Autowired
    private OrderRepository orderRepository;

    public SalesReportDTO getSalesReport() {

        SalesReportDTO report = new SalesReportDTO();

        // Only DELIVERED orders count as revenue
        List<Order> deliveredOrders =
                orderRepository.findByStatus(OrderStatus.DELIVERED);

        double totalRevenue = 0;
        double todayRevenue = 0;
        double weekRevenue = 0;
        double monthRevenue = 0;

        LocalDate today = LocalDate.now();

        for (Order order : deliveredOrders) {

            totalRevenue += order.getTotalPrice();

            if (order.getOrderDate() == null) {
                continue;
            }

            LocalDate orderDate =
                    order.getOrderDate().toLocalDate();

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
        report.setTotalOrders(orderRepository.count());

        long acceptedOrders =
                orderRepository.countByStatus(OrderStatus.ACCEPTED)
                + orderRepository.countByStatus(OrderStatus.PREPARING)
                + orderRepository.countByStatus(OrderStatus.READY)
                + orderRepository.countByStatus(OrderStatus.DELIVERED);

        report.setAcceptedOrders(acceptedOrders);

        report.setPendingOrders(
                orderRepository.countByStatus(
                        OrderStatus.PENDING));

        report.setRejectedOrders(
                orderRepository.countByStatus(
                        OrderStatus.REJECTED));

        // Revenue
        report.setTotalRevenue(totalRevenue);
        report.setTodayRevenue(todayRevenue);
        report.setWeekRevenue(weekRevenue);
        report.setMonthRevenue(monthRevenue);

        return report;
    }

}