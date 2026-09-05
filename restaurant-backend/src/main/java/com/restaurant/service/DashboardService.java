package com.restaurant.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.dto.DashboardDTO;
import com.restaurant.enums.OrderStatus;
import com.restaurant.repository.OrderRepository;

@Service
public class DashboardService {

    @Autowired
    private OrderRepository orderRepository;


    public DashboardDTO getDashboard() {

        DashboardDTO dashboard = new DashboardDTO();


        // Start and end of the current day

        LocalDate today = LocalDate.now();

        LocalDateTime startOfDay =
                today.atStartOfDay();

        LocalDateTime endOfDay =
                today.plusDays(1).atStartOfDay();


        // Pending orders created today

        long pendingOrders =
                orderRepository.countByStatusAndOrderDateBetween(
                        OrderStatus.PENDING,
                        startOfDay,
                        endOfDay
                );


        // Orders accepted today

        // This count does NOT depend on the current status.

        long acceptedOrders =
                orderRepository.countByAcceptedAtBetween(
                        startOfDay,
                        endOfDay
                );


        // Orders rejected today

        long rejectedOrders =
                orderRepository.countByRejectedAtBetween(
                        startOfDay,
                        endOfDay
                );


        // All orders created today

        long todayOrders =
                orderRepository.countByOrderDateBetween(
                        startOfDay,
                        endOfDay
                );


        dashboard.setPendingOrders(pendingOrders);

        dashboard.setAcceptedOrders(acceptedOrders);

        dashboard.setRejectedOrders(rejectedOrders);

        dashboard.setTodayOrders(todayOrders);


        return dashboard;
    }

}
